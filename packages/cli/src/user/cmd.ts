import {
  Context,
  createInstance,
  getInstance,
  listInstances,
  removeInstance
} from '@osaas/client-core';
import { Command } from 'commander';
import { confirm, instanceOptsToPayload } from './util';

export function cmdList() {
  const list = new Command('list');

  list
    .description('List all my service instances')
    .argument('<serviceId>', 'The Service Id')
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

export function cmdCreate() {
  const create = new Command('create');

  create
    .description('Create a service instance')
    .argument('<serviceId>', 'The Service Id')
    .argument('<name>', 'The instance name')
    .option(
      '-o, --instance-options [instanceOptions...]',
      'Instance options as key value pairs (e.g. -o key1=value1 -o key2=value2)'
    )
    .action(async (serviceId, name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const payload = instanceOptsToPayload(options.instanceOptions);
        payload['name'] = name;
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const serviceAccessToken = await ctx.getServiceAccessToken(serviceId);

        const instance = await createInstance(
          ctx,
          serviceId,
          serviceAccessToken,
          payload
        );
        console.log('Instance created:');
        console.log(instance);
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return create;
}

export function cmdDescribe() {
  const describe = new Command('describe');

  describe
    .description('Get details for a service instance')
    .argument('<serviceId>', 'The Service Id')
    .argument('<name>', 'The instance name')
    .action(async (serviceId, name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const serviceAccessToken = await ctx.getServiceAccessToken(serviceId);

        const instance = await getInstance(
          ctx,
          serviceId,
          name,
          serviceAccessToken
        );
        delete instance['resources'];
        Object.keys(instance).forEach((key) => {
          console.log(`${key}: ${instance[key]}`);
        });
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return describe;
}

export function cmdRemove() {
  const remove = new Command('remove');

  remove
    .description('Remove a service instance')
    .argument('<serviceId>', 'The Service Id')
    .argument('<name>', 'The instance name')
    .action(async (serviceId, name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const serviceAccessToken = await ctx.getServiceAccessToken(serviceId);

        await confirm(`Are you sure you want to remove ${name}? (yes/no) `);
        await removeInstance(ctx, serviceId, name, serviceAccessToken);
        console.log('Instance removed');
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return remove;
}
