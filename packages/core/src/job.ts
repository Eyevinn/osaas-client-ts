import { Context } from './context';
import {
  createInstance,
  getInstance,
  listInstances,
  removeInstance,
  getService
} from './core';

const MAX_ITER = 1000;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * @typedef ServiceJob
 * @type object
 * @property {string} name - Service job name
 * @property ... - Service specific job properties
 */

/**
 * Create a new service job in Open Source Cloud
 * @param {Context} context - Open Source Cloud configuration context
 * @param {string} serviceId - Service identifier. The service identifier is {github-organization}-{github-repo}
 * @param {string} token - Service access token
 * @param {object} body - Service job options. The options are service specific
 * @returns {ServiceJob} - Service job. The job is specific to the service
 * @example
 * import { Context, createJob } from '@osaas/client-core';
 * const serviceAccessToken = await ctx.getServiceAccessToken(
 *  'eyevinn-docker-retransfer'
 * );
 * const job = await createJob(
 *   ctx,
 *   'eyevinn-docker-retransfer',
 *   serviceAccessToken,
 *   {
 *     name: 'example',
 *     awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
 *     awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 *     cmdLineArgs: 's3://source/myfile.txt s3://dest/'
 *   }
 * );
 */
export async function createJob(
  context: Context,
  serviceId: string,
  token: string,
  body: any
): Promise<any> {
  const service = await getService(context, serviceId);

  if (service.serviceType !== 'job') {
    throw new Error('Service is not a job service');
  }
  return await createInstance(context, serviceId, token, body);
}

export async function removeJob(
  context: Context,
  serviceId: string,
  name: string,
  token: string
) {
  const service = await getService(context, serviceId);
  if (service.serviceType !== 'job') {
    throw new Error('Service is not a job service');
  }
  return await removeInstance(context, serviceId, name, token);
}

export async function getJob(
  context: Context,
  serviceId: string,
  name: string,
  token: string
) {
  const service = await getService(context, serviceId);
  if (service.serviceType !== 'job') {
    throw new Error('Service is not a job service');
  }
  return await getInstance(context, serviceId, name, token);
}

export async function listJobs(
  context: Context,
  serviceId: string,
  token: string
) {
  const service = await getService(context, serviceId);
  if (service.serviceType !== 'job') {
    throw new Error('Service is not a job service');
  }
  return await listInstances(context, serviceId, token);
}

export async function waitForJobToComplete(
  context: Context,
  serviceId: string,
  name: string,
  token: string
) {
  for (const _ of Array(MAX_ITER)) {
    const job = await getJob(context, serviceId, name, token);
    if (job.status === 'Complete') {
      break;
    }
    await delay(1000);
  }
}
