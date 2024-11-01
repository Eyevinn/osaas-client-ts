import { Context, Log, createFetch } from '@osaas/client-core';

const SERVICE_ID = 'ai';

type ChatResponse = {
  message: string;
};

export class ChatClient {
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

  public async sendChat(
    message: string,
    userProfile?: {
      firstName: string;
      lastName: string;
      jobTitle: string;
      industry: string;
    }
  ): Promise<ChatResponse> {
    if (!this.token) {
      throw new Error('Chat system not initialized');
    }

    const url = new URL(this.url + '/chat');
    const response = await createFetch<ChatResponse>(url, {
      method: 'POST',
      headers: {
        'x-pat-jwt': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, userProfile })
    });

    return response;
  }
}
