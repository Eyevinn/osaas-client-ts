import { Context, Log } from '@osaas/client-core';
import { createEyevinnTestAdserverInstance } from '../src/index';

async function main() {
  const ctx = new Context();

  try {
    const instance = await createEyevinnTestAdserverInstance(ctx, {
      name: 'sdk'
    });
    console.log(instance.url);
  } catch (err) {
    Log().error(err);
  }
}

main();
