import {
  Context,
  Log,
  createInstance,
  getInstance,
  getPortsForInstance,
  listInstances,
  removeInstance
} from '@osaas/client-core';

const SERVICE_ID = 'valkey-io-valkey';

export class ValkeyDb {
  private context: Context;
  private name: string;
  private token?: string;
  private url?: URL;

  constructor({ context, name }: { context: Context; name: string }) {
    this.context = context;
    this.name = name;
  }

  public static async list(ctx: Context): Promise<ValkeyDb[]> {
    const token = await ctx.getServiceAccessToken(SERVICE_ID);
    const instances = await listInstances(ctx, SERVICE_ID, token);
    return instances.map((instance: { name: string }) => {
      return new ValkeyDb({ context: ctx, name: instance.name });
    });
  }

  private async getRedisPort() {
    if (!this.token) {
      this.token = await this.context.getServiceAccessToken(SERVICE_ID);
    }
    const ports = await getPortsForInstance(
      this.context,
      SERVICE_ID,
      this.name,
      this.token
    );
    const redisPort = ports.find((port) => port.internalPort == 6379);
    return redisPort;
  }

  public async init() {
    this.token = await this.context.getServiceAccessToken(SERVICE_ID);
    const instance = await getInstance(
      this.context,
      SERVICE_ID,
      this.name,
      this.token
    );
    if (!instance) {
      if (
        !(await createInstance(this.context, SERVICE_ID, this.token, {
          name: this.name
        }))
      ) {
        throw new Error('Failed to create Valkey instance');
      }
    }
    const redisPort = await this.getRedisPort();
    if (redisPort) {
      this.url = new URL(
        `redis://${redisPort.externalIp}:${redisPort.externalPort}`
      );
    }
  }

  public async destroy() {
    try {
      this.token = await this.context.getServiceAccessToken(SERVICE_ID);
      await removeInstance(this.context, SERVICE_ID, this.name, this.token);
    } catch (err) {
      Log().error((err as Error).message);
    }
  }

  public async getRedisUrl(): Promise<URL | undefined> {
    if (!this.url) {
      await this.init();
    }
    return this.url;
  }

  public getName(): string {
    return this.name;
  }
}
