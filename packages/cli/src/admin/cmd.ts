import { Command } from 'commander';
import { generatePat } from './token';
import { Log } from '@osaas/client-core';
import { listInstancesForTenant } from './instance';

export default function cmdAdmin() {
  const admin = new Command('admin');
  admin
    .command('gen-pat')
    .description('Generate a personal access token')
    .argument('<tenantId>', 'The tenant ID')
    .argument('<username>', 'The username')
    .action((tenantId, username) => {
      try {
        const pat = generatePat(tenantId, username);
        console.log(pat);
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  admin
    .command('list-instances')
    .description('List all instances for a service and tenant')
    .argument('<tenantId>', 'The tenant ID')
    .argument('<serviceId>', 'The service ID')
    .action(async (tenantId, serviceId, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        Log().info(
          `Listing instance for tenant ${tenantId} and service ${serviceId} in ${environment}`
        );
        const instances = await listInstancesForTenant(
          tenantId,
          serviceId,
          environment
        );
        instances.forEach((instance) => console.log(instance));
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return admin;
}
