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
  '/swagger-editorinstance': {
    /** List all running swagger-editor instances */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the swagger-editor instance */
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
            ApiDefinitionUrl?: string;
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
    /** Launch a new swagger-editor instance */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the swagger-editor instance */
            name: string;
            ApiDefinitionUrl?: string;
          };
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the swagger-editor instance */
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
            ApiDefinitionUrl?: string;
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
  '/swagger-editorinstance/{id}': {
    /** Obtain status and resource URLs for an swagger-editor instance */
    get: {
      parameters: {
        path: {
          /** Name of the swagger-editor instance */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Name of the swagger-editor instance */
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
            ApiDefinitionUrl?: string;
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
    /** Stop and remove an swagger-editor instance */
    delete: {
      parameters: {
        path: {
          /** Name of the swagger-editor instance */
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
    /** Return status of swagger-editor instance */
    get: {
      parameters: {
        path: {
          /** Name of the swagger-editor instance */
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
    /** Return the latest logs from the swagger-editor instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Name of the swagger-editor instance */
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
    /** Return the exposed extra ports for swagger-editor instance */
    get: {
      parameters: {
        path: {
          /** Name of the swagger-editor instance */
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

export type SwaggerApiSwaggerEditor =
  paths['/swagger-editorinstance/{id}']['get']['responses']['200']['schema'];

export type SwaggerApiSwaggerEditorConfig =
  paths['/swagger-editorinstance']['post']['parameters']['body']['body'];

import {
  Context,
  createInstance,
  waitForInstanceReady
} from '@osaas/client-core';

/**
 * Swagger Editor
 *
 * Next generation Swagger Editor is here! Edit OpenAPI definitions in JSON or YAML format in your browser and preview documentation in real time. Generate valid OpenAPI definitions for full Swagger tooling support. Upgrade to SwaggerEditor@5 for OpenAPI 3.1.0 support and enjoy a brand-new version built from the ground up. Get your Swagger Editor now!
 *
 * Create a new editor
 * @param {Context} context - Open Source Cloud configuration context
 * @param {SwaggerApiSwaggerEditorConfig}} body - Service instance configuration
 * @returns {SwaggerApiSwaggerEditor} - Service instance
 * @example
 * import { Context, createSwaggerApiSwaggerEditorInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createSwaggerApiSwaggerEditorInstance(ctx, { name: 'myinstance' });
 * console.log(instance.url);
 */
export async function createSwaggerApiSwaggerEditorInstance(
  ctx: Context,
  body: SwaggerApiSwaggerEditorConfig
): Promise<SwaggerApiSwaggerEditor> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'swagger-api-swagger-editor'
  );
  const instance = await createInstance(
    ctx,
    'swagger-api-swagger-editor',
    serviceAccessToken,
    body
  );
  await waitForInstanceReady('swagger-api-swagger-editor', instance.name, ctx);
  return instance;
}
