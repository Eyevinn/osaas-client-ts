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
  '/schedule-serviceinstance': {
    /** List all running schedule-service instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the schedule-service instance */
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
            tablePrefix: string;
            awsAccessKeyId: string;
            awsSecretAccessKey: string;
            awsRegion: string;
          }[];
        };
        /** Default Response */
        500: {
          schema: string;
        };
      };
    };
    /** Launch a new schedule-service instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the schedule-service instance */
            name: string;
            tablePrefix: string;
            awsAccessKeyId: string;
            awsSecretAccessKey: string;
            awsRegion: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the schedule-service instance */
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
            tablePrefix: string;
            awsAccessKeyId: string;
            awsSecretAccessKey: string;
            awsRegion: string;
          };
        };
        /** Default Response */
        500: {
          schema: string;
        };
      };
    };
  };
  '/schedule-serviceinstance/{id}': {
    /** Obtain status and resource URLs for an schedule-service instance */
    get: {
      parameters: {
        path: {
          /** Name of the schedule-service instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the schedule-service instance */
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
            tablePrefix: string;
            awsAccessKeyId: string;
            awsSecretAccessKey: string;
            awsRegion: string;
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
    /** Stop and remove an schedule-service instance */
    delete: {
      parameters: {
        path: {
          /** Name of the schedule-service instance */
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
    /** Return status of schedule-service instance */
    get: {
      parameters: {
        path: {
          /** Name of the schedule-service instance */
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

export type EyevinnScheduleService =
  paths['/schedule-serviceinstance/{id}']['get']['responses']['200']['schema'];

export type EyevinnScheduleServiceConfig =
  paths['/schedule-serviceinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady,
  removeInstance
} from '@osaas/client-core';

/**
 * FAST Engine Schedule Service
 *
 * A modular service to automatically populate schedules for FAST Engine channels. Uses AWS Dynamo DB as database.
 *
 * Create a new scheduler
 * @param {Context} context - Open Source Cloud configuration context
 * @param {EyevinnScheduleServiceConfig}} body - Service instance configuration
 * @returns {EyevinnScheduleService} - Service instance
 * @example
 * import { Context, createEyevinnScheduleServiceInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createEyevinnScheduleServiceInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createEyevinnScheduleServiceInstance(
  ctx: Context,
  body: EyevinnScheduleServiceConfig
): Promise<EyevinnScheduleService> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-schedule-service'
  );
  const instance = await createInstance(
    ctx,
    'eyevinn-schedule-service',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('eyevinn-schedule-service', instance.name, ctx);
  return instance;
}

/**
 * FAST Engine Schedule Service
 *
 * Remove a scheduler
 * @param {Context} context - Open Source Cloud configuration context
 * @param {string} name - Name of the scheduler to be removed
 */
export async function removeEyevinnScheduleServiceInstance(
  ctx: Context,
  name: string
): Promise<void> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-schedule-service'
  );
  await removeInstance(
    ctx,
    'eyevinn-schedule-service',
    name,
    serviceAccessToken
  );
}
