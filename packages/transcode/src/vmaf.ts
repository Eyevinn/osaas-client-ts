import {
  Context,
  Log,
  createJob,
  waitForJobToComplete
} from '@osaas/client-core';
import path from 'node:path';

export async function vmafCompare(
  ctx: Context,
  reference: URL,
  distorted: URL,
  resultBucket: URL
): Promise<URL> {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-easyvmaf-s3'
  );
  const jobId = Math.random().toString(36).substring(7);
  const resultFile = `${resultBucket
    .toString()
    .replace(/\/$/, '')}/${path.basename(distorted.pathname)}_${jobId}.json`;

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials not set');
  }
  const job = await createJob(ctx, 'eyevinn-easyvmaf-s3', serviceAccessToken, {
    name: jobId,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    cmdLineArgs: `-r ${reference.toString()} -d ${distorted.toString()} -o ${resultFile}`
  });
  Log().debug(
    `Comparing file ${reference.toString()} with ${reference.toString()}`
  );
  await waitForJobToComplete(
    ctx,
    'eyevinn-easyvmaf-s3',
    job.name,
    serviceAccessToken
  );
  Log().debug(`VMAF comparison ${job.name} completed`);
  return new URL(resultFile);
}
