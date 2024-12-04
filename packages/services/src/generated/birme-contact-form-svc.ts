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
  '/contact-form-svcinstance': {
    /** List all running contact-form-svc instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the contact-form-svc instance */
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
            Transport: string;
            SlackBotToken?: string;
            SlackChannelId?: string;
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
    /** Launch a new contact-form-svc instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the contact-form-svc instance */
            name: string;
            Transport: string;
            SlackBotToken?: string;
            SlackChannelId?: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the contact-form-svc instance */
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
            Transport: string;
            SlackBotToken?: string;
            SlackChannelId?: string;
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
  '/contact-form-svcinstance/{id}': {
    /** Obtain status and resource URLs for an contact-form-svc instance */
    get: {
      parameters: {
        path: {
          /** Name of the contact-form-svc instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the contact-form-svc instance */
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
            Transport: string;
            SlackBotToken?: string;
            SlackChannelId?: string;
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
    /** Stop and remove an contact-form-svc instance */
    delete: {
      parameters: {
        path: {
          /** Name of the contact-form-svc instance */
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
    /** Return status of contact-form-svc instance */
    get: {
      parameters: {
        path: {
          /** Name of the contact-form-svc instance */
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
    /** Return the latest logs from the contact-form-svc instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the contact-form-svc instance */
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
    /** Return the exposed extra ports for contact-form-svc instance */
    get: {
      parameters: {
        path: {
          /** Name of the contact-form-svc instance */
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

export type BirmeContactFormSvc =
  paths['/contact-form-svcinstance/{id}']['get']['responses']['200']['schema'];

export type BirmeContactFormSvcConfig =
  paths['/contact-form-svcinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * Contact Form Service
 *
 * Streamline your communication with our Contact Form Service! Seamlessly send messages from your website directly to Slack. Easy-to-install, Docker-ready backend ensures you never miss a lead. Try it now!
 *
 * Create a new service
 * @param {Context} context - Open Source Cloud configuration context
 * @param {BirmeContactFormSvcConfig}} body - Service instance configuration
 * @returns {BirmeContactFormSvc} - Service instance
 * @example
 * import { Context, createBirmeContactFormSvcInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createBirmeContactFormSvcInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createBirmeContactFormSvcInstance(
  ctx: Context,
  body: BirmeContactFormSvcConfig
): Promise<BirmeContactFormSvc> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'birme-contact-form-svc'
  );
  return await createInstance(
    ctx,
    'birme-contact-form-svc',
    serviceAccessToken,
    body
  );
}
