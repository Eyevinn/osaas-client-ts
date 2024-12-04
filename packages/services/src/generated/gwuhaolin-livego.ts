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
  '/livegoinstance': {
    /** List all running livego instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the livego instance */
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
          schema: string;
        };
      };
    };
    /** Launch a new livego instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the livego instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the livego instance */
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
        500: {
          schema: string;
        };
      };
    };
  };
  '/livegoinstance/{id}': {
    /** Obtain status and resource URLs for an livego instance */
    get: {
      parameters: {
        path: {
          /** Name of the livego instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the livego instance */
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
          schema: string;
        };
        /** Default Response */
        500: {
          schema: string;
        };
      };
    };
    /** Stop and remove an livego instance */
    delete: {
      parameters: {
        path: {
          /** Name of the livego instance */
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
          schema: string;
        };
      };
    };
  };
  '/health/{id}': {
    /** Return status of livego instance */
    get: {
      parameters: {
        path: {
          /** Name of the livego instance */
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
          schema: string;
        };
      };
    };
  };
  '/logs/{id}': {
    /** Return the latest logs from the livego instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the livego instance */
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
          schema: string;
        };
      };
    };
  };
  '/ports/{id}': {
    /** Return the exposed extra ports for livego instance */
    get: {
      parameters: {
        path: {
          /** Name of the livego instance */
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
          schema: string;
        };
      };
    };
  };
}

export interface definitions {}

export interface operations {}

export interface external {}

export type GwuhaolinLivego =
  paths['/livegoinstance/{id}']['get']['responses']['200']['schema'];

export type GwuhaolinLivegoConfig =
  paths['/livegoinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * Livego
 *
 * Experience the power of simplicity and efficiency with our live broadcast server! Easy to install and use, built in pure Golang for high performance. Supports RTMP, AMF, HLS, HTTP-FLV protocols, FLV, TS containers, H264, AAC, MP3 encoding formats. Stream and playback seamlessly with just a few simple steps. Get your hands on this amazing product now!
 *
 * Create a new livego
 * @param {Context} context - Open Source Cloud configuration context
 * @param {GwuhaolinLivegoConfig}} body - Service instance configuration
 * @returns {GwuhaolinLivego} - Service instance
 * @example
 * import { Context, createGwuhaolinLivegoInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createGwuhaolinLivegoInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createGwuhaolinLivegoInstance(
  ctx: Context,
  body: GwuhaolinLivegoConfig
): Promise<GwuhaolinLivego> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'gwuhaolin-livego'
  );
  return await createInstance(
    ctx,
    'gwuhaolin-livego',
    serviceAccessToken,
    body
  );
}
