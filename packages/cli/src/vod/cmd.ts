import { Context, Log } from '@osaas/client-core';
import {
  createVod,
  createVodPipeline,
  removeVodPipeline
} from '@osaas/client-transcode';
import { Command } from 'commander';

export function cmdVod() {
  const vod = new Command('vod');
  vod
    .command('create')
    .description(
      'Create a VOD file ready for streaming. Will setup pipeline if not already created.'
    )
    .argument('<name>', 'Name of VOD Pipeline')
    .argument('<source>', 'Source URL')
    .action(async (name, source, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        Log().info('Creating VOD pipeline');
        const pipeline = await createVodPipeline(name, ctx);
        Log().info('VOD pipeline created, starting job to create VOD');
        const job = await createVod(pipeline, source, ctx);
        if (job) {
          Log().info('Created VOD will be available at: ' + job.vodUrl);
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  vod
    .command('cleanup')
    .description('Remove VOD pipeline but keep VOD files')
    .argument('<name>', 'Name of VOD Pipeline')
    .action(async (name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        Log().info('Removing VOD pipeline');
        await removeVodPipeline(name, ctx);
        Log().info('VOD pipeline removed');
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return vod;
}
