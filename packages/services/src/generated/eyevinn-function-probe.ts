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
  '/function-probeinstance': {
    /** List all running function-probe instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the function-probe instance */
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
    /** Launch a new function-probe instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the function-probe instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the function-probe instance */
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
  '/function-probeinstance/{id}': {
    /** Obtain status and resource URLs for an function-probe instance */
    get: {
      parameters: {
        path: {
          /** Name of the function-probe instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the function-probe instance */
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
    /** Stop and remove an function-probe instance */
    delete: {
      parameters: {
        path: {
          /** Name of the function-probe instance */
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
    /** Return status of function-probe instance */
    get: {
      parameters: {
        path: {
          /** Name of the function-probe instance */
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

export type EyevinnFunctionProbe =
  paths['/function-probeinstance/{id}']['get']['responses']['200']['schema'];

export type EyevinnFunctionProbeConfig =
  paths['/function-probeinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady,
  removeInstance
} from '@osaas/client-core';

/**
 * Media Probe
 *
 * A serverless media function to obtain media information for a media file or media stream.
 *
 * Create a new probe
 * @param {Context} context - Open Source Cloud configuration context
 * @param {EyevinnFunctionProbeConfig}} body - Service instance configuration
 * @returns {EyevinnFunctionProbe} - Service instance
 * @example
 * import { Context, createEyevinnFunctionProbeInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createEyevinnFunctionProbeInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createEyevinnFunctionProbeInstance(
  ctx: Context,
  body: EyevinnFunctionProbeConfig
): Promise<EyevinnFunctionProbe> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-function-probe'
  );
  const instance = await createInstance(
    ctx,
    'eyevinn-function-probe',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('eyevinn-function-probe', instance.name, ctx);
  return instance;
}

/**
 * Media Probe
 *
 * Remove a probe
 * @param {Context} context - Open Source Cloud configuration context
 * @param {string} name - Name of the probe to be removed
 */
export async function removeEyevinnFunctionProbeInstance(
  ctx: Context,
  name: string
): Promise<void> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-function-probe'
  );
  await removeInstance(ctx, 'eyevinn-function-probe', name, serviceAccessToken);
}
