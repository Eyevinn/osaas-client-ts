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
  '/wrtc-egressinstance': {
    /** List all running wrtc-egress instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the wrtc-egress instance */
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
            SmbUrl: string;
            SmbApiKey?: string;
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
    /** Launch a new wrtc-egress instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the wrtc-egress instance */
            name: string;
            SmbUrl: string;
            SmbApiKey?: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the wrtc-egress instance */
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
            SmbUrl: string;
            SmbApiKey?: string;
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
  '/wrtc-egressinstance/{id}': {
    /** Obtain status and resource URLs for an wrtc-egress instance */
    get: {
      parameters: {
        path: {
          /** Name of the wrtc-egress instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the wrtc-egress instance */
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
            SmbUrl: string;
            SmbApiKey?: string;
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
    /** Stop and remove an wrtc-egress instance */
    delete: {
      parameters: {
        path: {
          /** Name of the wrtc-egress instance */
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
    /** Return status of wrtc-egress instance */
    get: {
      parameters: {
        path: {
          /** Name of the wrtc-egress instance */
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
    /** Return the latest logs from the wrtc-egress instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the wrtc-egress instance */
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
    /** Return the exposed extra ports for wrtc-egress instance */
    get: {
      parameters: {
        path: {
          /** Name of the wrtc-egress instance */
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

export type EyevinnWrtcEgress =
  paths['/wrtc-egressinstance/{id}']['get']['responses']['200']['schema'];

export type EyevinnWrtcEgressConfig =
  paths['/wrtc-egressinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * Symphony Media Bridge WHEP Gateway
 *
 * "Streamline your video services with Eyevinn's WebRTC Egress Endpoint Library. Perfect for standardized streaming with WHEP protocol. Enhance your Symphony Media Bridge connections now!"
 *
 * Create a new gateway
 * @param {Context} context - Open Source Cloud configuration context
 * @param {EyevinnWrtcEgressConfig}} body - Service instance configuration
 * @returns {EyevinnWrtcEgress} - Service instance
 * @example
 * import { Context, createEyevinnWrtcEgressInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createEyevinnWrtcEgressInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createEyevinnWrtcEgressInstance(
  ctx: Context,
  body: EyevinnWrtcEgressConfig
): Promise<EyevinnWrtcEgress> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-wrtc-egress'
  );
  const instance = await createInstance(
    ctx,
    'eyevinn-wrtc-egress',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('eyevinn-wrtc-egress', instance.name, ctx);
  return instance;
}
