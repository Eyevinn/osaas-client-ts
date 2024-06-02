import {
  Context,
  Log,
  createJob,
  waitForJobToComplete
} from '@osaas/client-core';

/**
 * Create a HLS and MPEG-DASH streaming package
 *
 * @async
 * @memberof module:@osaas/client-transcode
 * @param {Context} ctx - Open Source Cloud configuration context
 * @param {URL} sourceBucket - URL to source bucket (supported protocols: s3)
 * @param {string[]} videos - List of video files in source bucket
 * @param {string} audio - Audio file in source bucket
 * @param {URL} resultBucket - URL to bucket where streaming package will be stored (supported protocols: s3)
 * @example
 * import { Context } from '@osaas/client-core';
 * import { createStreamingPackage } from '@osaas/client-transcode';
 *
 * const ctx = new Context();
 * await createStreamingPackage(
 *   ctx,
 *   new URL('s3://video/abr'),
 *   ['video1080p.mp4', 'video720p.mp4', 'video360p.mp4'],
 *   'audio.mp4',
 *   new URL('s3://video/streaming')
 * );
 */
export async function createStreamingPackage(
  ctx: Context,
  sourceBucket: URL,
  videos: string[],
  audio: string,
  resultBucket: URL
) {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-shaka-packager-s3'
  );
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials not set');
  }
  const jobId = Math.random().toString(36).substring(7);
  let idx = 1;
  let inputArgs = `-i a:${idx}=${audio}`;
  videos.forEach((video) => {
    inputArgs += ` -i v:${idx++}=${video}`;
  });
  const cmdLineArgs = `${sourceBucket.toString()} ${resultBucket.toString()} ${inputArgs}`;
  const job = await createJob(
    ctx,
    'eyevinn-shaka-packager-s3',
    serviceAccessToken,
    {
      name: jobId,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      cmdLineArgs
    }
  );
  Log().debug(
    `Creating streaming package for ${videos.length} video(s) and 1 audio file`
  );
  await waitForJobToComplete(
    ctx,
    'eyevinn-shaka-packager-s3',
    job.name,
    serviceAccessToken
  );
  Log().debug(`Streaming package ${job.name} created`);
}
