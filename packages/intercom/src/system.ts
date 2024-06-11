import { Context, Log, createFetch, getInstance } from '@osaas/client-core';

const SERVICE_ID = 'eyevinn-intercom-manager';

export class IntercomSystem {
  private context: Context;
  private name: string;
  private url?: string;
  private token?: string;

  constructor({ context, name }: { context: Context; name: string }) {
    this.context = context;
    this.name = name;
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
      throw new Error(`No Intercom system found with name ${this.name}`);
    }
    this.url = instance.url;
    Log().debug(instance);
    Log().debug(`Intercom system ${this.name} found on ${this.url}`);
  }

  public async listProductions() {
    if (!this.url) {
      throw new Error('Intercom system not initialized');
    }
    const url = new URL(this.url + '/api/v1/production');
    const productions = await createFetch<any>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
    return productions;
  }

  public async listLinesForProduction(productionId: string) {
    if (!this.url) {
      throw new Error('Intercom system not initialized');
    }
    const url = new URL(this.url + `/api/v1/production/${productionId}/line`);
    const lines = await createFetch<any>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
    return lines;
  }

  public async createProduction(name: string, lines: string[]) {
    if (!this.url) {
      throw new Error('Intercom system not initialized');
    }
    const url = new URL(this.url + '/api/v1/production');
    const production = await createFetch<any>(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        lines: lines.map((line) => {
          return { name: line };
        })
      })
    });
    return production;
  }

  public async deleteProduction(productionId: string) {
    if (!this.url) {
      throw new Error('Intercom system not initialized');
    }
    const url = new URL(this.url + `/api/v1/production/${productionId}`);
    const msg = await createFetch<any>(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    Log().info(msg);
  }
}
