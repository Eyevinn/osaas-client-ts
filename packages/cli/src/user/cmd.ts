import { Context, listInstances } from '@osaas/client-core';
import { Command } from 'commander';

export function cmdList() {
  const list = new Command('list');

  list
    .description('List all my service instances')
    .argument('<serviceId>', 'The service ID')
    .action(async (serviceId, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const serviceAccessToken = await ctx.getServiceAccessToken(serviceId);

        const instances = await listInstances(
          ctx,
          serviceId,
          serviceAccessToken
        );
        return instances.map((instance: { name: string }) =>
          console.log(instance.name)
        );
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return list;
}
