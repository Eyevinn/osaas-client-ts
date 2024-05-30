import {
  Context,
  Log,
  createFetch,
  createInstance,
  getInstance,
  removeInstance
} from '@osaas/client-core';
import { delay, transferFile, waitForEncoreJobToComplete } from './util';
import { FileOutput } from './encore';
import path from 'node:path';

/**
 * Represents a pool of Encore queues (instances) in Open Source Cloud
 */
export class QueuePool {
  private context: Context;
  private token?: string;
  private instances: string[];
  private queueSize: number;

  /**
   * @typedef QueuePoolOptions
   * @type object
   * @property {Context} context - Open Source Cloud configuration context
   * @property {number} size - Number of queues in the pool
   */

  /**
   * Creates a new Queue Pool
   * @constructor
   * @param {QueuePoolOptions} options - Queue Pool options
   * @example
   * import { Context } from '@osaas/client-core';
   * import { QueuePool } from '@osaas/transcode';
   * const ctx = new Context();
   * // Create a new pool with 2 queues
   * const pool = new QueuePool({ context: ctx, size: 2 });
   * await pool.init();
   */
  constructor({ context, size }: { context: Context; size?: number }) {
    this.context = context;
    this.instances = [];
    this.queueSize = size || 1;
  }

  /**
   * Initializes the pool by creating the queues
   * @async
   * @example
   * await pool.init();
   */
  public async init() {
    this.token = await this.context.getServiceAccessToken('encore');

    if (this.instances.length > 0) {
      throw new Error('Pool already initialized');
    }
    const names = [];
    for (let i = 0; i < this.queueSize; i++) {
      names.push(`node${i + 1}`);
    }
    for (const name of names) {
      const instance = await getInstance(
        this.context,
        'encore',
        name,
        this.token
      );
      if (!instance) {
        Log().debug(`Creating pool instance ${name}`);
        const instance = await createInstance(
          this.context,
          'encore',
          this.token,
          {
            name
          }
        );
        await delay(5000);
        this.instances.push(instance.name);
      } else {
        this.instances.push(instance.name);
      }
    }
  }

  /**
   * Destroys the pool by removing the queues
   * @async
   * @example
   * await pool.destroy();
   */
  public async destroy() {
    if (!this.token) {
      throw new Error('Pool not initialized');
    }
    for (const instance of this.instances) {
      await removeInstance(this.context, 'encore', instance, this.token);
    }
  }

  public async transcode(
    source: URL,
    destination: URL,
    { profile, duration }: { profile?: string; duration?: number }
  ) {
    if (!this.token) {
      throw new Error('Pool not initialized');
    }
    if (this.instances.length == 0) {
      throw new Error('Pool not initialized');
    }
    const name =
      this.instances[Math.floor(Math.random() * this.instances.length)];
    const instance = await getInstance(
      this.context,
      'encore',
      name,
      this.token
    );
    const jobId = Math.random().toString(36).substring(7);
    const encoreJobUrl = new URL('/encoreJobs', instance.url);
    const data = await createFetch<any>(encoreJobUrl, {
      method: 'POST',
      body: JSON.stringify({
        profile: profile || 'program',
        outputFolder: `/usercontent/${jobId}`,
        baseName: jobId,
        duration: duration,
        inputs: [
          {
            type: 'AudioVideo',
            uri: source.toString()
          }
        ]
      }),
      headers: {
        'x-jwt': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
    const encoreJob = JSON.parse(data);
    const job = await waitForEncoreJobToComplete(
      new URL(encoreJobUrl.toString() + '/' + encoreJob.id),
      this.token
    );
    Log().debug(job);
    const outputFiles: FileOutput[] = job.output.filter(
      (file: FileOutput) =>
        file.type === 'VideoFile' || file.type === 'AudioFile'
    );
    const transferPromises = outputFiles.map((file) =>
      transferFile(
        this.context,
        path.basename(file.file),
        new URL(file.file, instance.url),
        destination,
        this.token || ''
      )
    );
    await Promise.all(transferPromises);
  }
}
