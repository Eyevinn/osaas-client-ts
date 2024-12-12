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
  '/moe-replayinstance': {
    /** List all running moe-replay instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the moe-replay instance */
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
    /** Launch a new moe-replay instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the moe-replay instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the moe-replay instance */
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
  '/moe-replayinstance/{id}': {
    /** Obtain status and resource URLs for an moe-replay instance */
    get: {
      parameters: {
        path: {
          /** Name of the moe-replay instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the moe-replay instance */
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
    /** Stop and remove an moe-replay instance */
    delete: {
      parameters: {
        path: {
          /** Name of the moe-replay instance */
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
    /** Return status of moe-replay instance */
    get: {
      parameters: {
        path: {
          /** Name of the moe-replay instance */
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
    /** Return the latest logs from the moe-replay instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the moe-replay instance */
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
    /** Return the exposed extra ports for moe-replay instance */
    get: {
      parameters: {
        path: {
          /** Name of the moe-replay instance */
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

export type RealeyesMediaMoeReplay =
  paths['/moe-replayinstance/{id}']['get']['responses']['200']['schema'];

export type RealeyesMediaMoeReplayConfig =
  paths['/moe-replayinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * MOE Replay
 *
 * Transform live video streams instantly with MOE REPlay. Perfect for creating live HLS manifests on the fly. Enhance your streaming service now!
 *
 * Create a new moe-replay
 * @param {Context} context - Open Source Cloud configuration context
 * @param {RealeyesMediaMoeReplayConfig}} body - Service instance configuration
 * @returns {RealeyesMediaMoeReplay} - Service instance
 * @example
 * import { Context, createRealeyesMediaMoeReplayInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createRealeyesMediaMoeReplayInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createRealeyesMediaMoeReplayInstance(
  ctx: Context,
  body: RealeyesMediaMoeReplayConfig
): Promise<RealeyesMediaMoeReplay> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'realeyes-media-moe-replay'
  );
  const instance = await createInstance(
    ctx,
    'realeyes-media-moe-replay',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('realeyes-media-moe-replay', instance.name, ctx);
  return instance;
}
