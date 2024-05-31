import { Context } from '@osaas/client-core';
import { createStreamingPackage } from '@osaas/client-transcode';
import { Command } from 'commander';

export default function cmdPackager() {
  const packager = new Command('packager');

  packager
    .description(
      'Create streaming package from ABR bundle on S3 and store on another S3 bucket'
    )
    .argument('<source>', 'Source Bucket URL (supported protocols: s3)')
    .argument('<dest>', 'Destination URL (supported protocols: s3)')
    .option('-v, --videos <videos...>', 'List of video files')
    .option('-a, --audio <audio>', 'Audio file')
    .action(async (source, dest, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        await createStreamingPackage(
          ctx,
          new URL(source),
          options.videos,
          options.audio,
          new URL(dest)
        );
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return packager;
}
