import { Context, listInstances } from '@osaas/client-core';
import { generatePat } from './token';

export async function listInstancesForTenant(
  tenantId: string,
  serviceId: string,
  environment: string
): Promise<string[]> {
  const pat = generatePat(tenantId, 'osc-admin');

  const ctx = new Context({ personalAccessToken: pat, environment });
  const serviceAccessToken = await ctx.getServiceAccessToken(serviceId);

  const instances = await listInstances(ctx, serviceId, serviceAccessToken);
  return instances.map((instance: { name: string }) => instance.name);
}
