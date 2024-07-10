import { Context, Log, createFetch } from '@osaas/client-core';

const SERVICE_ID = 'ai';

type Embedding = {
  id: string;
  data: string;
  vectors?: number[];
  metadata?: {
    [x: string]: unknown;
  };
};

type EmbeddingsResponse = {
  embeddings: Embedding[];
  total: number;
};

export class EmbeddingsClient {
  private context: Context;
  private token?: string;
  private url?: string;

  constructor({ context }: { context: Context }) {
    this.context = context;
  }

  public async init() {
    this.token = this.context.getPersonalAccessToken();
    if (!this.token) {
      throw new Error('No personal access token found');
    }
    const environment = this.context.getEnvironment();
    this.url = `https://${SERVICE_ID}.svc.${environment}.osaas.io`;

    Log().debug(`Using url: ${this.url}`);
  }

  public async getEmbeddings(
    limit = 100,
    skip = 0,
    opts: { includeMetadata: boolean; includeVectors: boolean } = {
      includeMetadata: true,
      includeVectors: false
    }
  ): Promise<EmbeddingsResponse> {
    if (!this.token) {
      throw new Error('Embeddings system not initialized');
    }

    const url = new URL(
      this.url +
        `/admin/embeddings?limit=${limit}&skip=${skip}&includeMetadata=${opts.includeMetadata}&includeVectors=${opts.includeVectors}`
    );
    const embeddings = await createFetch<EmbeddingsResponse>(url, {
      method: 'GET',
      headers: {
        'x-pat-jwt': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });

    return embeddings;
  }

  public async upsertEmbeddings(
    embeddings: Embedding[]
  ): Promise<EmbeddingsResponse> {
    if (!this.token) {
      throw new Error('Embeddings system not initialized');
    }

    const url = new URL(this.url + `/admin/embeddings`);
    const response = await createFetch<EmbeddingsResponse>(url, {
      method: 'POST',
      headers: {
        'x-pat-jwt': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ embeddings })
    });

    return response;
  }

  public async deleteEmbeddings(ids: string[]): Promise<void> {
    if (!this.token) {
      throw new Error('Embeddings system not initialized');
    }

    const url = new URL(this.url + `/admin/embeddings`);
    await createFetch<void>(url, {
      method: 'DELETE',
      headers: {
        'x-pat-jwt': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    });
  }
}
