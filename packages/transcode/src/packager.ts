import {
  Context,
  Log,
  createJob,
  waitForJobToComplete
} from '@osaas/client-core';

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
