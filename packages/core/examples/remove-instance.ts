import { Context, Log, removeInstance } from '../src/index';

async function main() {
  const ctx = new Context();

  try {
    const serviceAccessToken = await ctx.getServiceAccessToken(
      'eyevinn-chaos-stream-proxy'
    );
    Log().info(serviceAccessToken);

    await removeInstance(
      ctx,
      'eyevinn-chaos-stream-proxy',
      'sdk',
      serviceAccessToken
    );
  } catch (err) {
    Log().error(err);
  }
}

main();
