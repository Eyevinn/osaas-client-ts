import { Context } from '@osaas/client-core';
import { ValkeyDb } from '@osaas/client-db';
import { Command } from 'commander';
import { confirm } from '../user/util';

function createDb(context: Context, type: string, name: string) {
  if (type === 'valkey') {
    return new ValkeyDb({ context, name });
  } else {
    throw new Error('Unsupported database type: ' + type);
  }
}

async function listDb(
  context: Context,
  type: string
): Promise<{ name: string; url?: URL }[]> {
  const databases: { name: string; url?: URL }[] = [];

  if (type === 'valkey') {
    const dbs = await ValkeyDb.list(context);
    for (const db of dbs) {
      const url = await db.getRedisUrl();
      databases.push({ name: db.getName(), url });
    }
  } else {
    throw new Error('Unsupported database type: ' + type);
  }
  return databases;
}

export default function cmdDb() {
  const db = new Command('db');
  db.command('create')
    .description('Create a new database')
    .argument('<type>', 'The database type (available: valkey)')
    .argument('<name>', 'The database name')
    .action(async (type, name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });

        const db = createDb(ctx, type, name);
        const redisUrl = await db.getRedisUrl();
        if (redisUrl) {
          console.log(redisUrl?.toString());
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  db.command('remove')
    .description('Remove a database')
    .argument('<type>', 'The database type (available: valkey)')
    .argument('<name>', 'The database name')
    .action(async (type, name, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });

        const db = createDb(ctx, type, name);
        await confirm(
          'Are you sure you want to remove this database? (yes/no) '
        );
        await db.destroy();
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  db.command('list')
    .description('List all databases')
    .argument('<type>', 'The database type (available: valkey)')
    .action(async (type, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const dbs = await listDb(ctx, type);
        dbs.forEach((db) => {
          console.log(db.name + ': ' + db.url?.toString());
        });
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  return db;
}
