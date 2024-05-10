import { Context, Service } from './context';
import { createFetch } from './fetch';

async function getService(context: Context, serviceId: string) {
  const serviceUrl = new URL(
    `https://catalog.svc.${context.getEnvironment()}.osaas.io/mysubscriptions`
  );
  const services = await createFetch<Service[]>(serviceUrl, {
    method: 'GET',
    headers: {
      'x-pat-jwt': `Bearer ${context.getPersonalAccessToken()}`,
      'Content-Type': 'application/json'
    }
  });
  const service = services.find((svc) => svc.serviceId === serviceId);
  if (!service) {
    throw new Error(`Service ${serviceId} not found in your subscriptions`);
  }
  return service;
}

export async function createInstance(
  context: Context,
  serviceId: string,
  token: string,
  body: any
): Promise<any> {
  const service = await getService(context, serviceId);
  const instanceUrl = new URL(service.apiUrl);

  const instance = await createFetch<any>(instanceUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'x-jwt': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return instance;
}

export async function removeInstance(
  context: Context,
  serviceId: string,
  name: string,
  token: string
) {
  const service = await getService(context, serviceId);
  const instanceUrl = new URL(service.apiUrl + '/' + name);

  await createFetch<any>(instanceUrl, {
    method: 'DELETE',
    headers: {
      'x-jwt': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export async function getInstance(
  context: Context,
  serviceId: string,
  name: string,
  token: string
) {
  const service = await getService(context, serviceId);
  const instanceUrl = new URL(service.apiUrl + '/' + name);

  return await createFetch<any>(instanceUrl, {
    method: 'GET',
    headers: {
      'x-jwt': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}
