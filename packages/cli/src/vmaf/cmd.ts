import { Context, Log } from '@osaas/client-core';
import { vmafCompare } from '@osaas/client-transcode';
import { Command } from 'commander';

export default function cmdCompare() {
  const compare = new Command('compare');

  compare
    .command('vmaf')
    .description('Compare two video files using VMAF')
    .argument(
      '<reference>',
      'URL to reference video file (supported protocols: s3)'
    )
    .argument(
      '<distorted>',
      'URL to distorted video file (supported protocols: s3)'
    )
    .argument(
      '<result>',
      'URL where to store the result (supported protocols: s3)'
    )
    .action(async (reference, distorted, result, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const resultUrl = await vmafCompare(
          ctx,
          new URL(reference),
          new URL(distorted),
          new URL(result)
        );
        Log().info(`VMAF comparison result stored at ${resultUrl.toString()}`);
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return compare;
}
