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
  '/livesim2instance': {
    /** List all running livesim2 instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the livesim2 instance */
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
    /** Launch a new livesim2 instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the livesim2 instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the livesim2 instance */
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
  '/livesim2instance/{id}': {
    /** Obtain status and resource URLs for an livesim2 instance */
    get: {
      parameters: {
        path: {
          /** Name of the livesim2 instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the livesim2 instance */
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
    /** Stop and remove an livesim2 instance */
    delete: {
      parameters: {
        path: {
          /** Name of the livesim2 instance */
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
    /** Return status of livesim2 instance */
    get: {
      parameters: {
        path: {
          /** Name of the livesim2 instance */
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
    /** Return the latest logs from the livesim2 instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the livesim2 instance */
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
    /** Return the exposed extra ports for livesim2 instance */
    get: {
      parameters: {
        path: {
          /** Name of the livesim2 instance */
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

export type DashIndustryForumLivesim2 =
  paths['/livesim2instance/{id}']['get']['responses']['200']['schema'];

export type DashIndustryForumLivesim2Config =
  paths['/livesim2instance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * livesim2
 *
 * Elevate your streaming with livesim2, the next-gen DASH Live Source Simulator, offering infinite live streams, flexible content handling, and on-the-fly subtitles in multiple languages. Perfect for testing and demo purposes.
 *
 * Create a new livesimulators
 * @param {Context} context - Open Source Cloud configuration context
 * @param {DashIndustryForumLivesim2Config}} body - Service instance configuration
 * @returns {DashIndustryForumLivesim2} - Service instance
 * @example
 * import { Context, createDashIndustryForumLivesim2Instance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createDashIndustryForumLivesim2Instance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createDashIndustryForumLivesim2Instance(
  ctx: Context,
  body: DashIndustryForumLivesim2Config
): Promise<DashIndustryForumLivesim2> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'dash-industry-forum-livesim2'
  );
  const instance = await createInstance(
    ctx,
    'dash-industry-forum-livesim2',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady(
    'dash-industry-forum-livesim2',
    instance.name,
    ctx
  );
  return instance;
}
