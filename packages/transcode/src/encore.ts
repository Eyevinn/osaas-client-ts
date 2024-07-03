import {
  Context,
  Log,
  createInstance,
  getInstance,
  listInstances,
  removeInstance,
  valueOrSecret
} from '@osaas/client-core';

export type FileOutput = {
  file: string;
  fileSize: number;
  format: string;
  overallBitrate: number;
  duration: number;
  videoStreams: any[];
  audioStreams: any[];
  type: string;
};

export type EncoreCallbackListenerOpts = {
  context: Context;
  name: string;
  redisUrl: string;
  encoreUrl: string;
  redisQueue?: string;
};

const CALLBACK_SERVICE_ID = 'eyevinn-encore-callback-listener';

export class EncoreCallbackListener {
  private context: Context;
  private name: string;
  private redisUrl: string;
  private redisQueue?: string;
  private encoreUrl: string;
  private token?: string;
  private callbackUrl?: string;

  constructor({
    context,
    name,
    redisUrl,
    encoreUrl,
    redisQueue
  }: EncoreCallbackListenerOpts) {
    this.context = context;
    this.name = name;
    this.redisUrl = redisUrl;
    this.redisQueue = redisQueue;
    this.encoreUrl = encoreUrl;
  }

  public static async list(ctx: Context): Promise<EncoreCallbackListener[]> {
    const token = await ctx.getServiceAccessToken(CALLBACK_SERVICE_ID);
    const instances = await listInstances(ctx, CALLBACK_SERVICE_ID, token);
    return instances.map(
      (instance: {
        name: string;
        RedisUrl: string;
        EncoreUrl: string;
        RedisQueue?: string;
      }) => {
        return new EncoreCallbackListener({
          context: ctx,
          name: instance.name,
          redisUrl: instance.RedisUrl,
          encoreUrl: instance.EncoreUrl,
          redisQueue: instance.RedisQueue
        });
      }
    );
  }

  public async init() {
    this.token = await this.context.getServiceAccessToken(CALLBACK_SERVICE_ID);
    const instance = await getInstance(
      this.context,
      CALLBACK_SERVICE_ID,
      this.name,
      this.token
    );
    if (!instance) {
      const newInstance = await createInstance(
        this.context,
        CALLBACK_SERVICE_ID,
        this.token,
        {
          name: this.name,
          RedisUrl: this.redisUrl,
          EncoreUrl: this.encoreUrl,
          RedisQueue: this.redisQueue
        }
      );
      if (!newInstance) {
        throw new Error('Failed to create Encore Callback Listener instance');
      }
      this.callbackUrl = newInstance.url + '/encoreCallback';
    } else {
      this.callbackUrl = instance.url + '/encoreCallback';
    }
  }

  public async destroy() {
    try {
      this.token = await this.context.getServiceAccessToken(
        CALLBACK_SERVICE_ID
      );
      await removeInstance(
        this.context,
        CALLBACK_SERVICE_ID,
        this.name,
        this.token
      );
    } catch (err) {
      Log().error((err as Error).message);
    }
  }

  public getCallbackUrl(): string | undefined {
    return this.callbackUrl;
  }

  public getRedisUrl(): string {
    return valueOrSecret(this.redisUrl);
  }

  public getEncoreUrl(): string {
    return valueOrSecret(this.encoreUrl);
  }

  public getRedisQueue(): string | undefined {
    if (this.redisQueue) {
      return valueOrSecret(this.redisQueue);
    }
    return undefined;
  }

  public getName(): string {
    return this.name;
  }
}

export type EncorePackagerOpts = {
  context: Context;
  name: string;
  redisUrl: string;
  redisQueue?: string;
  outputFolder: string;
  concurrency?: number;
  personalAccessTokenSecret?: string;
  awsAccessKeyIdSecret?: string;
  awsSecretAccessKeySecret?: string;
};

const PACKAGER_SERVICE_ID = 'eyevinn-encore-packager';

export class EncorePackager {
  private context: Context;
  private name: string;
  private token?: string;
  private redisUrl: string;
  private redisQueue?: string;
  private concurrency?: number;
  private personalAccessTokenSecret: string;
  private awsAccessKeyIdSecret: string;
  private awsSecretAccessKeySecret: string;
  private outputFolder: string;

  constructor({
    context,
    name,
    redisUrl,
    redisQueue,
    outputFolder,
    concurrency,
    personalAccessTokenSecret,
    awsAccessKeyIdSecret,
    awsSecretAccessKeySecret
  }: EncorePackagerOpts) {
    this.context = context;
    this.name = name;
    this.redisUrl = redisUrl;
    this.redisQueue = redisQueue;
    this.outputFolder = outputFolder;
    this.concurrency = concurrency;
    this.personalAccessTokenSecret = personalAccessTokenSecret || 'osctoken';
    this.awsAccessKeyIdSecret = awsAccessKeyIdSecret || 'awsaccesskeyid';
    this.awsSecretAccessKeySecret =
      awsSecretAccessKeySecret || 'awssecretaccesskey';
  }

  public static async list(ctx: Context): Promise<EncorePackager[]> {
    const token = await ctx.getServiceAccessToken(PACKAGER_SERVICE_ID);
    const instances = await listInstances(ctx, PACKAGER_SERVICE_ID, token);
    return instances.map(
      (instance: {
        name: string;
        RedisUrl: string;
        RedisQueue?: string;
        OutputFolder: string;
        Concurrency?: string;
      }) => {
        return new EncorePackager({
          context: ctx,
          name: instance.name,
          redisUrl: instance.RedisUrl,
          redisQueue: instance.RedisQueue,
          outputFolder: instance.OutputFolder,
          concurrency: instance.Concurrency
            ? parseInt(instance.Concurrency)
            : undefined
        });
      }
    );
  }

  public async init() {
    this.token = await this.context.getServiceAccessToken(PACKAGER_SERVICE_ID);
    const instance = await getInstance(
      this.context,
      PACKAGER_SERVICE_ID,
      this.name,
      this.token
    );
    if (!instance) {
      const newInstance = await createInstance(
        this.context,
        PACKAGER_SERVICE_ID,
        this.token,
        {
          name: this.name,
          RedisUrl: this.redisUrl,
          RedisQueue: this.redisQueue,
          OutputFolder: this.outputFolder,
          Concurrency: this.concurrency?.toString(),
          PersonalAccessToken: `{{secrets.${this.personalAccessTokenSecret}}}`,
          AwsAccessKeyId: `{{secrets.${this.awsAccessKeyIdSecret}}}`,
          AwsSecretAccessKey: `{{secrets.${this.awsSecretAccessKeySecret}}}`
        }
      );
      if (!newInstance) {
        throw new Error('Failed to create Encore Packager instance');
      }
    }
  }

  public async destroy() {
    try {
      this.token = await this.context.getServiceAccessToken(
        PACKAGER_SERVICE_ID
      );
      await removeInstance(
        this.context,
        PACKAGER_SERVICE_ID,
        this.name,
        this.token
      );
    } catch (err) {
      Log().error((err as Error).message);
    }
  }

  public getOutputFolder(): string {
    return this.outputFolder;
  }

  public getName(): string {
    return this.name;
  }
}
