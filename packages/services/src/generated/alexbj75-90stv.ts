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
  '/90stvinstance': {
    /** List all running 90stv instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the 90stv instance */
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
    /** Launch a new 90stv instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the 90stv instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the 90stv instance */
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
  '/90stvinstance/{id}': {
    /** Obtain status and resource URLs for an 90stv instance */
    get: {
      parameters: {
        path: {
          /** Name of the 90stv instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the 90stv instance */
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
    /** Stop and remove an 90stv instance */
    delete: {
      parameters: {
        path: {
          /** Name of the 90stv instance */
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
    /** Return status of 90stv instance */
    get: {
      parameters: {
        path: {
          /** Name of the 90stv instance */
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
    /** Return the latest logs from the 90stv instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the 90stv instance */
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
    /** Return the exposed extra ports for 90stv instance */
    get: {
      parameters: {
        path: {
          /** Name of the 90stv instance */
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

export type Alexbj7590stv =
  paths['/90stvinstance/{id}']['get']['responses']['200']['schema'];

export type Alexbj7590stvConfig =
  paths['/90stvinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * 90stv
 *
 * Experience nostalgia with 90stv! Transform your FAST channels into a classic 90s TV viewing adventure, effortlessly with a quick Docker setup. Relive the golden era of television today!
 *
 * Create a new 90stv
 * @param {Context} context - Open Source Cloud configuration context
 * @param {Alexbj7590stvConfig}} body - Service instance configuration
 * @returns {Alexbj7590stv} - Service instance
 * @example
 * import { Context, createAlexbj7590stvInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createAlexbj7590stvInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createAlexbj7590stvInstance(
  ctx: Context,
  body: Alexbj7590stvConfig
): Promise<Alexbj7590stv> {
  const serviceAccessToken = await ctx.getServiceAccessToken('alexbj75-90stv');
  return await createInstance(ctx, 'alexbj75-90stv', serviceAccessToken, body);
}
