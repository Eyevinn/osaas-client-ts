import { Context } from '@osaas/client-core';
import { QueuePool } from '@osaas/client-transcode';
import { Command } from 'commander';

export default function cmdTranscode() {
  const transcode = new Command('transcode');

  transcode
    .description('Transcode file to ABR fileset and store on S3 bucket')
    .argument('<source>', 'Source URL (supported protocols: http, https)')
    .argument('<dest>', 'Destination URL (supported protocols: s3)')
    .option(
      '-d, --duration <duration>',
      'Duration in seconds. If not provided will transcode entire file'
    )
    .action(async (source, dest, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const pool = new QueuePool({ context: ctx, size: 1 });
        await pool.init();
        await pool.transcode(new URL(source), new URL(dest), {
          duration: options.duration
        });
        await pool.destroy();
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return transcode;
}
