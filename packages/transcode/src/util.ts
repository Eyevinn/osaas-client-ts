import {
  Context,
  Log,
  createFetch,
  createJob,
  waitForJobToComplete
} from '@osaas/client-core';

const MAX_ITER = 1000;

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function waitForEncoreJobToComplete(jobUrl: URL, token: string) {
  for (const _ of Array(MAX_ITER)) {
    const data = await createFetch<any>(jobUrl, {
      method: 'GET',
      headers: {
        'x-jwt': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const job = JSON.parse(data);
    Log().debug(`Progress: ${job.progress}`);
    if (job.status === 'SUCCESSFUL') {
      return job;
    }
    await delay(10000);
  }
}

export async function transferFile(
  ctx: Context,
  name: string,
  source: URL,
  destination: URL,
  token: string
) {
  const serviceAccessToken = await ctx.getServiceAccessToken(
    'eyevinn-docker-retransfer'
  );

  const job = await createJob(
    ctx,
    'eyevinn-docker-retransfer',
    serviceAccessToken,
    {
      name,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      cmdLineArgs: `--sat ${token} ${source.toString()} ${destination.toString()}`
    }
  );
  Log().debug(
    `Transfer file ${source.toString()} to ${destination.toString()}`
  );
  await waitForJobToComplete(
    ctx,
    'eyevinn-docker-retransfer',
    job.name,
    serviceAccessToken
  );
  Log().debug(`File transfer job ${job.name} completed`);
}
