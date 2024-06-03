import { Context } from '@osaas/client-core';
import {
  createLiveSingleBitrateHLS,
  listSingleBitrateHLS,
  removeLiveSingleBitrateHLS
} from '@osaas/client-transcode';
import { Command } from 'commander';

export default function cmdLive() {
  const live = new Command('live');
  live
    .command('start-single')
    .description('Create RTMP endpoint for live single bitrate stream')
    .argument('<name>', 'Stream name')
    .action(async (name, options, command) => {
      const globalOpts = command.optsWithGlobals();
      const environment = globalOpts?.env || 'prod';
      const ctx = new Context({ environment });
      const { rtmpUrl, hlsUrl } = await createLiveSingleBitrateHLS(ctx, name);
      console.log(`Start streaming to ${rtmpUrl} and watch at ${hlsUrl}`);
    });

  live
    .command('stop-single')
    .description('Stop and remove RTMP endpoint for live single bitrate stream')
    .argument('<name>', 'Stream name')
    .action(async (name, options, command) => {
      const globalOpts = command.optsWithGlobals();
      const environment = globalOpts?.env || 'prod';
      const ctx = new Context({ environment });
      await removeLiveSingleBitrateHLS(ctx, name);
    });

  live
    .command('list-single')
    .description('List all live single bitrate streams')
    .action(async (options, command) => {
      const globalOpts = command.optsWithGlobals();
      const environment = globalOpts?.env || 'prod';
      const ctx = new Context({ environment });
      const streams = await listSingleBitrateHLS(ctx);
      streams.map((stream) =>
        console.log(stream.name + ': ' + stream.hlsUrl.toString())
      );
    });

  return live;
}
