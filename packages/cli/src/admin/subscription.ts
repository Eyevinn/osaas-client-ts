import {
  Context,
  listSubscriptions,
  removeSubscription
} from '@osaas/client-core';
import { generatePat } from './token';
import { listInstancesForTenant } from './instance';

export async function listSubscriptionsForTenant(
  tenantId: string,
  environment: string
): Promise<string[]> {
  const pat = generatePat(tenantId, 'osc-admin');

  const ctx = new Context({ personalAccessToken: pat, environment });

  const subscriptions = await listSubscriptions(ctx);
  return subscriptions.map((subscription) => subscription.serviceId);
}

export async function removeSubscriptionForTenant(
  tenantId: string,
  serviceId: string,
  environment: string
): Promise<void> {
  const pat = generatePat(tenantId, 'osc-admin');

  const ctx = new Context({ personalAccessToken: pat, environment });
  const instances = await listInstancesForTenant(
    tenantId,
    serviceId,
    environment
  );
  if (instances.length > 0) {
    throw new Error(
      `Cannot remove subscription for service ${serviceId} as there are instances associated with it`
    );
  }

  await removeSubscription(ctx, serviceId);
}
