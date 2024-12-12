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
  '/pds-admininstance': {
    /** List all running pds-admin instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the pds-admin instance */
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
            PdsUrl: string;
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
    /** Launch a new pds-admin instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the pds-admin instance */
            name: string;
            PdsUrl: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the pds-admin instance */
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
            PdsUrl: string;
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
  '/pds-admininstance/{id}': {
    /** Obtain status and resource URLs for an pds-admin instance */
    get: {
      parameters: {
        path: {
          /** Name of the pds-admin instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the pds-admin instance */
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
            PdsUrl: string;
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
    /** Stop and remove an pds-admin instance */
    delete: {
      parameters: {
        path: {
          /** Name of the pds-admin instance */
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
    /** Return status of pds-admin instance */
    get: {
      parameters: {
        path: {
          /** Name of the pds-admin instance */
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
    /** Return the latest logs from the pds-admin instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the pds-admin instance */
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
    /** Return the exposed extra ports for pds-admin instance */
    get: {
      parameters: {
        path: {
          /** Name of the pds-admin instance */
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

export type EyevinnPdsAdmin =
  paths['/pds-admininstance/{id}']['get']['responses']['200']['schema'];

export type EyevinnPdsAdminConfig =
  paths['/pds-admininstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * PDS Admin
 *
 * Effortlessly manage your Bluesky Personal Data Server with our intuitive admin tool. Optimize your data environment locally or in the cloud with seamless installation and dependable performance.
 *
 * Create a new app
 * @param {Context} context - Open Source Cloud configuration context
 * @param {EyevinnPdsAdminConfig}} body - Service instance configuration
 * @returns {EyevinnPdsAdmin} - Service instance
 * @example
 * import { Context, createEyevinnPdsAdminInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createEyevinnPdsAdminInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createEyevinnPdsAdminInstance(
  ctx: Context,
  body: EyevinnPdsAdminConfig
): Promise<EyevinnPdsAdmin> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-pds-admin'
  );
  const instance = await createInstance(
    ctx,
    'eyevinn-pds-admin',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('eyevinn-pds-admin', instance.name, ctx);
  return instance;
}
