import { Context } from '@osaas/client-core';
import { IntercomSystem } from '@osaas/client-intercom';
import { Command } from 'commander';
import { confirm } from '../user/util';

export default function cmdIntercom() {
  const intercom = new Command('intercom');

  intercom
    .command('list-productions')
    .description('List production in Open Source Cloud Intercom System')
    .argument('<name>', 'Intercom system name')
    .action(async (name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const intercom = new IntercomSystem({ context: ctx, name });
        await intercom.init();
        const productions = await intercom.listProductions();
        for (const production of productions) {
          console.log(production.productionId + ': ' + production.name);
          const lines = await intercom.listLinesForProduction(
            production.productionId
          );
          lines.map((line: any) =>
            console.log(
              '+-- ' +
                line.id +
                ': ' +
                line.name +
                ` (${line.participants.length})`
            )
          );
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  intercom
    .command('create-production')
    .description('Create production in Open Source Cloud Intercom System')
    .argument('<name>', 'Intercom system name')
    .argument('<production>', 'Production name to create')
    .argument('<lines...>', 'List of lines to create')
    .action(async (name, production, lines, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const intercom = new IntercomSystem({ context: ctx, name });
        await intercom.init();
        const productions = await intercom.listProductions();
        if (productions.find((p: any) => p.name === production)) {
          console.log(`Production ${production} already exists`);
          return;
        }
        const p = await intercom.createProduction(production, lines);
        console.log(`Production '${p.name}' created with id ${p.productionId}`);
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  intercom
    .command('delete-production')
    .description('Delete production in Open Source Cloud Intercom System')
    .argument('<name>', 'Intercom system name')
    .argument('<id>', 'Id of production to delete')
    .action(async (name, id, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const intercom = new IntercomSystem({ context: ctx, name });
        await intercom.init();
        await confirm(
          'Are you sure you want to remove this production? (yes/no) '
        );
        await intercom.deleteProduction(id);
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return intercom;
}
