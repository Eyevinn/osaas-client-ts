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
  '/rest-rsmqinstance': {
    /** List all running rest-rsmq instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the rest-rsmq instance */
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
            RedisUrl: string;
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
    /** Launch a new rest-rsmq instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the rest-rsmq instance */
            name: string;
            RedisUrl: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the rest-rsmq instance */
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
            RedisUrl: string;
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
  '/rest-rsmqinstance/{id}': {
    /** Obtain status and resource URLs for an rest-rsmq instance */
    get: {
      parameters: {
        path: {
          /** Name of the rest-rsmq instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the rest-rsmq instance */
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
            RedisUrl: string;
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
    /** Stop and remove an rest-rsmq instance */
    delete: {
      parameters: {
        path: {
          /** Name of the rest-rsmq instance */
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
    /** Return status of rest-rsmq instance */
    get: {
      parameters: {
        path: {
          /** Name of the rest-rsmq instance */
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
    /** Return the latest logs from the rest-rsmq instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the rest-rsmq instance */
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
    /** Return the exposed extra ports for rest-rsmq instance */
    get: {
      parameters: {
        path: {
          /** Name of the rest-rsmq instance */
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

export type SmrchyRestRsmq =
  paths['/rest-rsmqinstance/{id}']['get']['responses']['200']['schema'];

export type SmrchyRestRsmqConfig =
  paths['/rest-rsmqinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * Really Simple Message Queue
 * 
 * **Boost Your Productivity with REST rsmq**

Easily integrate with rsmq for efficient message queuing. No security worries, just seamless communication across platforms like php, .net, and more. Maximize performance now!
 * 
 * Create a new message-queue
 * @param {Context} context - Open Source Cloud configuration context
 * @param {SmrchyRestRsmqConfig}} body - Service instance configuration
 * @returns {SmrchyRestRsmq} - Service instance
 * @example
 * import { Context, createSmrchyRestRsmqInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createSmrchyRestRsmqInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createSmrchyRestRsmqInstance(
  ctx: Context,
  body: SmrchyRestRsmqConfig
): Promise<SmrchyRestRsmq> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'smrchy-rest-rsmq'
  );
  return await createInstance(
    ctx,
    'smrchy-rest-rsmq',
    serviceAccessToken,
    body
  );
}
