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
  '/channel': {
    /** List all running FAST channels */
    get: {
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Channel Id */
            id: string;
            /** @description Name of the channel */
            name: string;
            /** @enum {string} */
            type: 'Loop' | 'Playlist' | 'WebHook' | 'Barker';
            /** @description URL to playlist, VOD to loop or webhook */
            url: string;
          }[];
        };
      };
    };
    /** Launch a new FAST channel */
    post: {
      parameters: {
        body: {
          body?: {
            /** @description Name of the channel */
            name: string;
            /** @enum {string} */
            type: 'Loop' | 'Playlist' | 'WebHook' | 'Barker';
            /** @description URL to playlist or VOD to loop */
            url: string;
            opts?: {
              /** @description Use demuxed audio (default is true) */
              useDemuxedAudio?: boolean;
              /** @description Use VTT subtitles (default is true) */
              useVttSubtitles?: boolean;
              /** @description URI to default slate */
              defaultSlateUri?: string;
              /** @description Comma separated list of languages, e.g. ("en,ja"). First one is defined to be default */
              langList?: string;
              /** @description Comma separated list of subtitle languages, e.g. ("en,ja"). First one is defined to be default */
              langListSubs?: string;
              /** @description Channel preset. Available presets are: DD, HEVC, ATMOS */
              preset?: string;
              preroll?: {
                /** @description URL to preroll */
                url: string;
                /** @description Duration of preroll in milliseconds */
                duration: number;
              };
              webhook?: {
                /** @description API key for webhook */
                apikey?: string;
              };
            };
          };
        };
      };
      responses: {
        /** Default Response */
        201: {
          schema: {
            /** @description Channel Id */
            id: string;
            /** @description Name of the channel */
            name: string;
            /** @enum {string} */
            type: 'Loop' | 'Playlist' | 'WebHook' | 'Barker';
            /** @description URL to playlist or VOD to loop */
            url: string;
            opts?: {
              /** @description Use demuxed audio (default is true) */
              useDemuxedAudio?: boolean;
              /** @description Use VTT subtitles (default is true) */
              useVttSubtitles?: boolean;
              /** @description URI to default slate */
              defaultSlateUri?: string;
              /** @description Comma separated list of languages, e.g. ("en,ja"). First one is defined to be default */
              langList?: string;
              /** @description Comma separated list of subtitle languages, e.g. ("en,ja"). First one is defined to be default */
              langListSubs?: string;
              /** @description Channel preset. Available presets are: DD, HEVC, ATMOS */
              preset?: string;
              preroll?: {
                /** @description URL to preroll */
                url: string;
                /** @description Duration of preroll in milliseconds */
                duration: number;
              };
              webhook?: {
                /** @description API key for webhook */
                apikey?: string;
              };
            };
            /** @description Playback URL */
            playback: string;
          };
        };
      };
    };
  };
  '/channel/{id}': {
    /** Obtain status and playback URL for a FAST channel */
    get: {
      parameters: {
        path: {
          /** Channel Id */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Channel Id */
            id: string;
            /** @description Name of the channel */
            name: string;
            /** @enum {string} */
            type: 'Loop' | 'Playlist' | 'WebHook' | 'Barker';
            /** @description URL to playlist, VOD to loop or webhook */
            url: string;
          };
        };
      };
    };
    /** Stop and remove a FAST channel */
    delete: {
      parameters: {
        path: {
          /** Channel Id */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        204: {
          schema: string;
        };
      };
    };
  };
  '/health/{id}': {
    /** Channel health check */
    get: {
      parameters: {
        path: {
          /** Channel Id */
          id: string;
        };
      };
      responses: {
        /** Default Response */
        200: {
          schema: {
            /** @description Health of the channel */
            health: string;
            /** @description Status of the channel */
            status: string;
          };
        };
      };
    };
  };
  '/logs/{id}': {
    /** Return the latest logs from a channel-engine instance */
    get: {
      parameters: {
        query: {
          timestamps?: boolean;
          sinceSeconds?: number;
        };
        path: {
          /** Channel Id */
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
}

export interface definitions {}

export interface operations {}

export interface external {}

export type ChannelEngine =
  paths['/channel/{id}']['get']['responses']['200']['schema'];

export type ChannelEngineConfig =
  paths['/channel']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

/**
 * FAST Channel Engine
 *
 * Based on VOD2Live Technology you can generate a numerous amounts of FAST channels with a fraction of energy consumption compared to live transcoded FAST channels
 *
 * Create a new channel
 * @param {Context} context - Open Source Cloud configuration context
 * @param {ChannelEngineConfig}} body - Service instance configuration
 * @returns {ChannelEngine} - Service instance
 * @example
 * import { Context, createChannelEngineInstance } from '@osaas/client-services';
 *
 * const ctx = new Context();
 * const instance = await createChannelEngineInstance(ctx, { name: 'my-instance' });
 * console.log(instance.url);
 */
export async function createChannelEngineInstance(
  ctx: Context,
  body: ChannelEngineConfig
): Promise<ChannelEngine> {
  const serviceAccessToken = await ctx.getServiceAccessToken('channel-engine');
  return await createInstance(ctx, 'channel-engine', serviceAccessToken, body);
}
