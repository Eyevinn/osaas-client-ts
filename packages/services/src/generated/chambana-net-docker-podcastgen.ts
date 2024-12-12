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
  '/docker-podcastgeninstance': {
    /** List all running docker-podcastgen instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the docker-podcastgen instance */
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
    /** Launch a new docker-podcastgen instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the docker-podcastgen instance */
            name: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the docker-podcastgen instance */
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
  '/docker-podcastgeninstance/{id}': {
    /** Obtain status and resource URLs for an docker-podcastgen instance */
    get: {
      parameters: {
        path: {
          /** Name of the docker-podcastgen instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the docker-podcastgen instance */
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
    /** Stop and remove an docker-podcastgen instance */
    delete: {
      parameters: {
        path: {
          /** Name of the docker-podcastgen instance */
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
    /** Return status of docker-podcastgen instance */
    get: {
      parameters: {
        path: {
          /** Name of the docker-podcastgen instance */
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
    /** Return the latest logs from the docker-podcastgen instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the docker-podcastgen instance */
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
    /** Return the exposed extra ports for docker-podcastgen instance */
    get: {
      parameters: {
        path: {
          /** Name of the docker-podcastgen instance */
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

export type ChambanaNetDockerPodcastgen =
  paths['/docker-podcastgeninstance/{id}']['get']['responses']['200']['schema'];

export type ChambanaNetDockerPodcastgenConfig =
  paths['/docker-podcastgeninstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * Podcast Generator
 *
 * Effortlessly host and manage your podcasts with our Docker container for Podcast Generator. Quick setup and version flexibility let you focus on content creation while we handle the rest.
 *
 * Create a new podcast-generator
 * @param {Context} context - Open Source Cloud configuration context
 * @param {ChambanaNetDockerPodcastgenConfig}} body - Service instance configuration
 * @returns {ChambanaNetDockerPodcastgen} - Service instance
 * @example
 * import { Context, createChambanaNetDockerPodcastgenInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createChambanaNetDockerPodcastgenInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createChambanaNetDockerPodcastgenInstance(
  ctx: Context,
  body: ChambanaNetDockerPodcastgenConfig
): Promise<ChambanaNetDockerPodcastgen> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'chambana-net-docker-podcastgen'
  );
  const instance = await createInstance(
    ctx,
    'chambana-net-docker-podcastgen',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady(
    'chambana-net-docker-podcastgen',
    instance.name,
    ctx
  );
  return instance;
}
