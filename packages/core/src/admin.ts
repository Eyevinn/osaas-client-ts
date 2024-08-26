import { Context } from './context';
import { createFetch } from './fetch';

export type Subscription = {
  serviceId: string;
  tenantId: string;
};

export async function listSubscriptions(
  context: Context
): Promise<Subscription[]> {
  const serviceUrl = new URL(
    `https://catalog.svc.${context.getEnvironment()}.osaas.io/mysubscriptions`
  );

  return await createFetch<Subscription[]>(serviceUrl, {
    method: 'GET',
    headers: {
      'x-pat-jwt': `Bearer ${context.getPersonalAccessToken()}`,
      'Content-Type': 'application/json'
    }
  });
}

export async function removeSubscription(
  context: Context,
  serviceId: string
): Promise<void> {
  const serviceUrl = new URL(
    `https://catalog.svc.${context.getEnvironment()}.osaas.io/mysubscriptions/${serviceId}`
  );

  await createFetch<{ reason: string } | string>(serviceUrl, {
    method: 'DELETE',
    body: JSON.stringify({ services: [serviceId] }),
    headers: {
      'x-pat-jwt': `Bearer ${context.getPersonalAccessToken()}`,
      'Content-Type': 'application/json'
    }
  });
}
