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
  '/kings-and-pigs-tsinstance': {
    /** List all running kings-and-pigs-ts instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the kings-and-pigs-ts instance */
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
    /** Launch a new kings-and-pigs-ts instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the kings-and-pigs-ts instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the kings-and-pigs-ts instance */
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
  '/kings-and-pigs-tsinstance/{id}': {
    /** Obtain status and resource URLs for an kings-and-pigs-ts instance */
    get: {
      parameters: {
        path: {
          /** Name of the kings-and-pigs-ts instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the kings-and-pigs-ts instance */
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
    /** Stop and remove an kings-and-pigs-ts instance */
    delete: {
      parameters: {
        path: {
          /** Name of the kings-and-pigs-ts instance */
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
    /** Return status of kings-and-pigs-ts instance */
    get: {
      parameters: {
        path: {
          /** Name of the kings-and-pigs-ts instance */
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
    /** Return the latest logs from the kings-and-pigs-ts instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the kings-and-pigs-ts instance */
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
    /** Return the exposed extra ports for kings-and-pigs-ts instance */
    get: {
      parameters: {
        path: {
          /** Name of the kings-and-pigs-ts instance */
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

export type BwallbergKingsAndPigsTs =
  paths['/kings-and-pigs-tsinstance/{id}']['get']['responses']['200']['schema'];

export type BwallbergKingsAndPigsTsConfig =
  paths['/kings-and-pigs-tsinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * Kings and Pigs
 *
 * Dive into Kings and Pigs, a vibrant 2D TypeScript game! Explore custom ECS architecture & physics with Planck.js. Perfect for TypeScript learners & game enthusiasts. Play now!
 *
 * Create a new kings-and-pigs-ts
 * @param {Context} context - Open Source Cloud configuration context
 * @param {BwallbergKingsAndPigsTsConfig}} body - Service instance configuration
 * @returns {BwallbergKingsAndPigsTs} - Service instance
 * @example
 * import { Context, createBwallbergKingsAndPigsTsInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createBwallbergKingsAndPigsTsInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createBwallbergKingsAndPigsTsInstance(
  ctx: Context,
  body: BwallbergKingsAndPigsTsConfig
): Promise<BwallbergKingsAndPigsTs> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'bwallberg-kings-and-pigs-ts'
  );
  const instance = await createInstance(
    ctx,
    'bwallberg-kings-and-pigs-ts',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('bwallberg-kings-and-pigs-ts', instance.name, ctx);
  return instance;
}
