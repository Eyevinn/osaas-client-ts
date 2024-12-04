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
  '/flyimginstance': {
    /** List all running flyimg instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the flyimg instance */
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
    /** Launch a new flyimg instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the flyimg instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the flyimg instance */
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
  '/flyimginstance/{id}': {
    /** Obtain status and resource URLs for an flyimg instance */
    get: {
      parameters: {
        path: {
          /** Name of the flyimg instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the flyimg instance */
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
    /** Stop and remove an flyimg instance */
    delete: {
      parameters: {
        path: {
          /** Name of the flyimg instance */
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
    /** Return status of flyimg instance */
    get: {
      parameters: {
        path: {
          /** Name of the flyimg instance */
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
}

export interface definitions {}

export interface operations {}

export interface external {}

export type FlyimgFlyimg =
  paths['/flyimginstance/{id}']['get']['responses']['200']['schema'];

export type FlyimgFlyimgConfig =
  paths['/flyimginstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * flyimg
 * 
 * An application that allows you to resize, crop, and compress images on the fly. 

By default, Flyimg generates the AVIF image format (when the browser supports it) which provides superior compression compared to other formats.

Additionally, Flyimg also generates the WebP format, along with the impressive MozJPEG compression algorithm to optimize images, other formats are supported also such as PNG and GIF.
 * 
 * Create a new flyimg
 * @param {Context} context - Open Source Cloud configuration context
 * @param {FlyimgFlyimgConfig}} body - Service instance configuration
 * @returns {FlyimgFlyimg} - Service instance
 * @example
 * import { Context, createFlyimgFlyimgInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createFlyimgFlyimgInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createFlyimgFlyimgInstance(
  ctx: Context,
  body: FlyimgFlyimgConfig
): Promise<FlyimgFlyimg> {
  const serviceAccessToken = await ctx.getServiceAccessToken('flyimg-flyimg');
  return await createInstance(ctx, 'flyimg-flyimg', serviceAccessToken, body);
}
