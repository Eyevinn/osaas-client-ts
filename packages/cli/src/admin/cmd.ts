import { Command } from 'commander';
import { generatePat } from './token';
import { Log } from '@osaas/client-core';
import { listInstancesForTenant, removeInstanceForTenant } from './instance';
import { confirm } from '../user/util';
import {
  listSubscriptionsForTenant,
  removeSubscriptionForTenant
} from './subscription';

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
  admin
    .command('remove-instance')
    .description('Remove an instance')
    .argument('<tenantId>', 'The Tenant Id')
    .argument('<serviceId>', 'The Service Id')
    .argument('<name>', 'The instance name')
    .action(async (tenantId, serviceId, name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        Log().info(
          `Removing instance ${name} for tenant ${tenantId} and service ${serviceId} in ${environment}`
        );
        await confirm(
          'Are you sure you want to remove this instance? (yes/no) '
        );
        await removeInstanceForTenant(tenantId, serviceId, name, environment);
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  admin
    .command('list-subscriptions')
    .description('List all subscriptions for a tenant')
    .argument('<tenantId>', 'The tenant ID')
    .action(async (tenantId, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        Log().info(
          `Listing subscriptions for tenant ${tenantId} in ${environment}`
        );
        const subscriptions = await listSubscriptionsForTenant(
          tenantId,
          environment
        );
        subscriptions.forEach((subscription) => console.log(subscription));
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  admin
    .command('remove-subscription')
    .description('Remove a subscription for a tenant')
    .argument('<tenantId>', 'The Tenant Id')
    .argument('<serviceId>', 'The Service Id')
    .action(async (tenantId, serviceId, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        Log().info(
          `Removing ${serviceId} subscription for tenant ${tenantId} in ${environment}`
        );
        const subscriptions = await listSubscriptionsForTenant(
          tenantId,
          environment
        );
        if (subscriptions.includes(serviceId)) {
          await confirm(
            `Are you sure you want to remove the subscription for service ${serviceId}? (yes/no) `
          );
          await removeSubscriptionForTenant(tenantId, serviceId, environment);
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return admin;
}
