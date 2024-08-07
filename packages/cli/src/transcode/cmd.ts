import { Context } from '@osaas/client-core';
import {
  Encore,
  EncoreCallbackListener,
  EncorePackager,
  QueuePool
} from '@osaas/client-transcode';
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
        if (options.background) {
          throw new Error(
            `Option '-b' has been deprecated and replaced with 'osc pipeline' command.`
          );
        }
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

export function cmdVodPipeline() {
  const pipeline = new Command('pipeline');
  pipeline
    .command('create')
    .description('Create a new VOD pipeline')
    .argument('<dest>', 'Destination URL (supported protocols: s3)')
    .option(
      '-s, --size <size>',
      'Number of Encore instances in the pool (default: 1)'
    )
    .action(async (dest, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const pool = new QueuePool({
          context: ctx,
          size: options.size || 1,
          usePackagingQueue: true,
          packageDestination: new URL(dest)
        });
        await pool.destroy(); // Remove pipeline if already exists
        await pool.init();
        console.log('VOD pipeline created');
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  pipeline
    .command('transcode')
    .description('Transcode and create VOD package')
    .argument('<source>', 'Source URL (supported protocols: http, https)')
    .option(
      '-d, --duration <duration>',
      'Duration in seconds. If not provided will transcode entire file'
    )
    .action(async (source, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const pool = new QueuePool({
          context: ctx,
          size: options.size || 1,
          usePackagingQueue: true
        });
        await pool.init();
        await pool.transcode(new URL(source), new URL('s3://dummy/'), {
          duration: options.duration
        });
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  pipeline
    .command('teardown')
    .description('Tear down the VOD pipeline')
    .option(
      '-s, --size <size>',
      'Number of Encore instances in the pool (default: 1)'
    )
    .action(async (options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const pool = new QueuePool({
          context: ctx,
          size: options.size || 1,
          usePackagingQueue: true,
          packageDestination: new URL('s3://dummy')
        });
        await pool.init();
        await pool.destroy();
        console.log('VOD pipeline torn down');
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return pipeline;
}

export function cmdEncore() {
  const encore = new Command('encore');

  encore
    .command('create')
    .description('Create a new Encore transcoding pipeline')
    .argument('<name>', 'Name of Encore transcoding pipeline')
    .argument('<dest>', 'Destination URL (supported protocols: s3)')
    .action(async (name, dest, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const encore = new Encore({
          context: ctx,
          name,
          outputFolder: new URL(dest)
        });
        await encore.init();
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  encore
    .command('teardown')
    .description('Teardown an Encore transcoding pipeline')
    .argument('<name>', 'Name of Encore transcoding pipeline')
    .action(async (name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const encore = new Encore({
          context: ctx,
          name,
          outputFolder: new URL('s3://dummy/')
        });
        await encore.init();
        await encore.destroy();
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  encore
    .command('transcode')
    .description('Start a new Encore transcoding job')
    .argument('<name>', 'Name of Encore transcoding pipeline')
    .argument('<source>', 'Source URL (supported protocols: http, https)')
    .option(
      '-d, --duration <duration>',
      'Duration in seconds. If not provided will transcode entire file'
    )
    .action(async (name, source, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const encore = new Encore({
          context: ctx,
          name
        });
        await encore.init();
        await encore.transcode(new URL(source), {
          duration: options.duration
        });
      } catch (err) {
        console.log((err as Error).message);
      }
    });

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

  encore
    .command('list-packagers')
    .description('List all packagers')
    .action(async (options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const packagers = await EncorePackager.list(ctx);
        packagers.map((packager: EncorePackager) =>
          console.log(packager.getName() + ': ' + packager.getOutputFolder())
        );
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  return encore;
}
