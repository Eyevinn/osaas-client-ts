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
  '/filestashinstance': {
    /** List all running filestash instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the filestash instance */
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
            AdminPassword?: string;
            ConfigSecret?: string;
            DropboxClientId?: string;
            GdriveClientId?: string;
            GdriveClientSecret?: string;
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
    /** Launch a new filestash instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the filestash instance */
            name: string;
            AdminPassword?: string;
            ConfigSecret?: string;
            DropboxClientId?: string;
            GdriveClientId?: string;
            GdriveClientSecret?: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the filestash instance */
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
            AdminPassword?: string;
            ConfigSecret?: string;
            DropboxClientId?: string;
            GdriveClientId?: string;
            GdriveClientSecret?: string;
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
  '/filestashinstance/{id}': {
    /** Obtain status and resource URLs for an filestash instance */
    get: {
      parameters: {
        path: {
          /** Name of the filestash instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the filestash instance */
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
            AdminPassword?: string;
            ConfigSecret?: string;
            DropboxClientId?: string;
            GdriveClientId?: string;
            GdriveClientSecret?: string;
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
    /** Stop and remove an filestash instance */
    delete: {
      parameters: {
        path: {
          /** Name of the filestash instance */
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
    /** Return status of filestash instance */
    get: {
      parameters: {
        path: {
          /** Name of the filestash instance */
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
    /** Return the latest logs from the filestash instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the filestash instance */
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
    /** Return the exposed extra ports for filestash instance */
    get: {
      parameters: {
        path: {
          /** Name of the filestash instance */
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

export type MickaelKerjeanFilestash =
  paths['/filestashinstance/{id}']['get']['responses']['200']['schema'];

export type MickaelKerjeanFilestashConfig =
  paths['/filestashinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady,
  removeInstance,
  getInstance
} from '@osaas/client-core';

/**
 * Create a new Filestash instance
 *
 * @description Transform your data management with Filestash, a versatile file manager that integrates seamlessly with multiple cloud services and protocols. Enjoy blazing speed, user-friendly interfaces, and plugin flexibility.
 * @param {Context} context - Open Source Cloud configuration context
 * @param {MickaelKerjeanFilestashConfig}} body - Service instance configuration
 * @returns {MickaelKerjeanFilestash} - Service instance
 * @example
 * import { Context, createMickaelKerjeanFilestashInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createMickaelKerjeanFilestashInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createMickaelKerjeanFilestashInstance(
  ctx: Context,
  body: MickaelKerjeanFilestashConfig
): Promise<MickaelKerjeanFilestash> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'mickael-kerjean-filestash'
  );
  const instance = await createInstance(
    ctx,
    'mickael-kerjean-filestash',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('mickael-kerjean-filestash', instance.name, ctx);
  return instance;
}

/**
 * Remove a Filestash instance
 *
 * @description Transform your data management with Filestash, a versatile file manager that integrates seamlessly with multiple cloud services and protocols. Enjoy blazing speed, user-friendly interfaces, and plugin flexibility.
 * @param {Context} context - Open Source Cloud configuration context
 * @param {string} name - Name of the filestash to be removed
 */
export async function removeMickaelKerjeanFilestashInstance(
  ctx: Context,
  name: string
): Promise<void> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'mickael-kerjean-filestash'
  );
  await removeInstance(
    ctx,
    'mickael-kerjean-filestash',
    name,
    serviceAccessToken
  );
}

/**
 * Get a Filestash instance
 *
 * @description Transform your data management with Filestash, a versatile file manager that integrates seamlessly with multiple cloud services and protocols. Enjoy blazing speed, user-friendly interfaces, and plugin flexibility.
 * @param {Context} context - Open Source Cloud configuration context
 * @param {string} name - Name of the filestash to be retrieved
 * @returns {MickaelKerjeanFilestash} - Service instance
 */
export async function getMickaelKerjeanFilestashInstance(
  ctx: Context,
  name: string
): Promise<MickaelKerjeanFilestash> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'mickael-kerjean-filestash'
  );
  return await getInstance(
    ctx,
    'mickael-kerjean-filestash',
    name,
    serviceAccessToken
  );
}
