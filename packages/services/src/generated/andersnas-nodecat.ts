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
  '/nodecatinstance': {
    /** List all running nodecat instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the nodecat instance */
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
            SigningKey?: string;
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
    /** Launch a new nodecat instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the nodecat instance */
            name: string;
            SigningKey?: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the nodecat instance */
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
            SigningKey?: string;
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
  '/nodecatinstance/{id}': {
    /** Obtain status and resource URLs for an nodecat instance */
    get: {
      parameters: {
        path: {
          /** Name of the nodecat instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the nodecat instance */
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
            SigningKey?: string;
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
    /** Stop and remove an nodecat instance */
    delete: {
      parameters: {
        path: {
          /** Name of the nodecat instance */
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
    /** Return status of nodecat instance */
    get: {
      parameters: {
        path: {
          /** Name of the nodecat instance */
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
    /** Return the latest logs from the nodecat instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the nodecat instance */
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
    /** Return the exposed extra ports for nodecat instance */
    get: {
      parameters: {
        path: {
          /** Name of the nodecat instance */
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

export type AndersnasNodecat =
  paths['/nodecatinstance/{id}']['get']['responses']['200']['schema'];

export type AndersnasNodecatConfig =
  paths['/nodecatinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * NodeCat
 *
 * Enhance your app's security with NodeCat, a robust solution for generating and validating Common Access Tokens in a NodeJS environment. Ideal for developers needing reliable token management.
 *
 * Create a new nodecat
 * @param {Context} context - Open Source Cloud configuration context
 * @param {AndersnasNodecatConfig}} body - Service instance configuration
 * @returns {AndersnasNodecat} - Service instance
 * @example
 * import { Context, createAndersnasNodecatInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createAndersnasNodecatInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createAndersnasNodecatInstance(
  ctx: Context,
  body: AndersnasNodecatConfig
): Promise<AndersnasNodecat> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'andersnas-nodecat'
  );
  return await createInstance(
    ctx,
    'andersnas-nodecat',
    serviceAccessToken,
    body
  );
}
