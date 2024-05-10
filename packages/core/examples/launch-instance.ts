import { Context, Log, createInstance } from '../src/index';

async function main() {
  const ctx = new Context();

  try {
    const serviceAccessToken = await ctx.getServiceAccessToken(
      'eyevinn-chaos-stream-proxy'
    );
    Log().info(serviceAccessToken);

    const instance = await createInstance(
      ctx,
      'eyevinn-chaos-stream-proxy',
      serviceAccessToken,
      { name: 'sdk' }
    );
    console.log(instance.url);
  } catch (err) {
    Log().error(err);
  }
}

main();
