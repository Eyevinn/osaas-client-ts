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
  '/function-scenesinstance': {
    /** List all running function-scenes instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the function-scenes instance */
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
    /** Launch a new function-scenes instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the function-scenes instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the function-scenes instance */
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
  '/function-scenesinstance/{id}': {
    /** Obtain status and resource URLs for an function-scenes instance */
    get: {
      parameters: {
        path: {
          /** Name of the function-scenes instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the function-scenes instance */
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
    /** Stop and remove an function-scenes instance */
    delete: {
      parameters: {
        path: {
          /** Name of the function-scenes instance */
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
}

export interface definitions {}

export interface operations {}

export interface external {}

export type EyevinnFunctionScenes =
  paths['/function-scenesinstance/{id}']['get']['responses']['200']['schema'];

export type EyevinnFunctionScenesConfig =
  paths['/function-scenesinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

export async function createEyevinnFunctionScenesInstance(
  ctx: Context,
  body: EyevinnFunctionScenesConfig
): Promise<EyevinnFunctionScenes> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-function-scenes'
  );
  return await createInstance(
    ctx,
    'eyevinn-function-scenes',
    serviceAccessToken,
    body
  );
}