export type PlatformConfig = {
  apiKey?: string;
  environment?: string;
};

export class Platform {
  private apiKey?: string;
  private environment: string;

  constructor(config?: PlatformConfig) {
    if (!config?.apiKey && !process.env.OSC_API_KEY) {
      throw new Error(
        'Platform API key is required. Please provide it in the config or set the OSC_API_KEY environment variable.'
      );
    }

    this.apiKey = config?.apiKey ? config.apiKey : process.env.OSC_API_KEY;
    this.environment = config?.environment ? config.environment : 'prod';
  }

  getApiKey() {
    return this.apiKey;
  }

  getEnvironment() {
    return this.environment;
  }
}
