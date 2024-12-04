/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    /** Say hello */
    get: {
      responses: {
        /** The magical words! */
        200: {
          schema: string;
        };
      };
    };
  };
  '/chaosproxy-configinstance': {
    /** List all running chaosproxy-config instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the chaosproxy-config instance */
            name: string;
            /** @description URL to instance API */
            url: string;
            resources: {
              license: {
                /** @description URL to license information */
                url: string;
              };
              apiDocs?: {
                /** @description URL to instance API documentation */
                url: string;
              };
              app?: {
                /** @description URL to instance application (GUI) */
                url: string;
              };
            };
          }[];
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
    /** Launch a new chaosproxy-config instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the chaosproxy-config instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the chaosproxy-config instance */
            name: string;
            /** @description URL to instance API */
            url: string;
            resources: {
              license: {
                /** @description URL to license information */
                url: string;
              };
              apiDocs?: {
                /** @description URL to instance API documentation */
                url: string;
              };
              app?: {
                /** @description URL to instance application (GUI) */
                url: string;
              };
            };
          };
        };
        /** Default Response */
        403: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
        /** Default Response */
        409: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
  };
  '/chaosproxy-configinstance/{id}': {
    /** Obtain status and resource URLs for an chaosproxy-config instance */
    get: {
      parameters: {
        path: {
          /** Name of the chaosproxy-config instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the chaosproxy-config instance */
            name: string;
            /** @description URL to instance API */
            url: string;
            resources: {
              license: {
                /** @description URL to license information */
                url: string;
              };
              apiDocs?: {
                /** @description URL to instance API documentation */
                url: string;
              };
              app?: {
                /** @description URL to instance application (GUI) */
                url: string;
              };
            };
          };
        };
        /** Default Response */
        404: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
    /** Stop and remove an chaosproxy-config instance */
    delete: {
      parameters: {
        path: {
          /** Name of the chaosproxy-config instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        204: {
          schema: string;
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
  };
  '/health/{id}': {
    /** Return status of chaosproxy-config instance */
    get: {
      parameters: {
        path: {
          /** Name of the chaosproxy-config instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @enum {string} */
            status: 'starting' | 'running' | 'stopped' | 'failed' | 'unknown';
          };
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
  };
  '/logs/{id}': {
    /** Return the latest logs from the chaosproxy-config instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the chaosproxy-config instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: string;
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
  };
  '/ports/{id}': {
    /** Return the exposed extra ports for chaosproxy-config instance */
    get: {
      parameters: {
        path: {
          /** Name of the chaosproxy-config instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            externalIp: string;
            externalPort: number;
            internalPort: number;
          }[];
        };
        /** Default Response */
        500: {
          schema: {
            /** @description Reason why something failed */
            reason: string;
          };
        };
      };
    };
  };
}

export interface definitions {}

export interface operations {}

export interface external {}

export type AnderswassenChaosproxyConfig =
  paths['/chaosproxy-configinstance/{id}']['get']['responses']['200']['schema'];

export type AnderswassenChaosproxyConfigConfig =
  paths['/chaosproxy-configinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * Chaos Stream Proxy Configurator
 *
 * Revolutionize your streaming experience with the Chaos Stream Proxy Configurator! Customize HLS streams with precision-timed delays for enhanced content manipulation and control effortlessly.
 *
 * Create a new configurator
 * @param {Context} context - Open Source Cloud configuration context
 * @param {AnderswassenChaosproxyConfigConfig}} body - Service instance configuration
 * @returns {AnderswassenChaosproxyConfig} - Service instance
 * @example
 * import { Context, createAnderswassenChaosproxyConfigInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createAnderswassenChaosproxyConfigInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createAnderswassenChaosproxyConfigInstance(
  ctx: Context,
  body: AnderswassenChaosproxyConfigConfig
): Promise<AnderswassenChaosproxyConfig> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'anderswassen-chaosproxy-config'
  );
  return await createInstance(
    ctx,
    'anderswassen-chaosproxy-config',
    serviceAccessToken,
    body
  );
}
