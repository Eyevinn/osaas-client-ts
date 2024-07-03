import { Context } from '@osaas/client-core';
import { EncoreCallbackListener, QueuePool } from '@osaas/client-transcode';
import { Command } from 'commander';

export function cmdTranscode() {
  const transcode = new Command('transcode');

  transcode
    .description('Transcode file to ABR fileset and store on S3 bucket')
    .argument('<source>', 'Source URL (supported protocols: http, https)')
    .argument('<dest>', 'Destination URL (supported protocols: s3)')
    .argument(
      '[packageDestination]',
      'Optional destination URL for Streaming package (supported protocols: s3)'
    )
    .option(
      '-d, --duration <duration>',
      'Duration in seconds. If not provided will transcode entire file'
    )
    .option('-b, --background', 'Run transcoding and packaging in background')
    .action(async (source, dest, packageDestination, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const pool = new QueuePool({
          context: ctx,
          size: 1,
          usePackagingQueue: options.background
        });
        await pool.init();
        await pool.transcode(new URL(source), new URL(dest), {
          duration: options.duration,
          packageDestination: packageDestination
        });
        if (!options.background) {
          await pool.destroy();
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return transcode;
}

export function cmdEncore() {
  const encore = new Command('encore');
  encore
    .command('list-callbacks')
    .description('List all callback listeners')
    .action(async (options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const callbacks = await EncoreCallbackListener.list(ctx);
        callbacks.map((callback: EncoreCallbackListener) =>
          console.log(callback.getName())
        );
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return encore;
}
