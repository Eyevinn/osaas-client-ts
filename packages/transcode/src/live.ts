import {
  Context,
  createInstance,
  getPortsForInstance,
  listInstances,
  removeInstance
} from '@osaas/client-core';

export async function createLiveSingleBitrateHLS(
  ctx: Context,
  name: string
): Promise<{ rtmpUrl: URL; hlsUrl: URL }> {
  const serviceAccessToken = await ctx.getServiceAccessToken('ossrs-srs');

  const encoder = await createInstance(ctx, 'ossrs-srs', serviceAccessToken, {
    name
  });
  const ports = await getPortsForInstance(
    ctx,
    'ossrs-srs',
    encoder.name,
    serviceAccessToken
  );
  const rtmpPort = ports.find((port) => port.internalPort == 1935);
  if (!rtmpPort) {
    throw new Error('Instance has no RTMP port mapped');
  }
  return {
    rtmpUrl: new URL(
      `rtmp://${rtmpPort.externalIp}:${rtmpPort.externalPort}/live/livestream`
    ),
    hlsUrl: new URL(encoder.url + '/live/livestream.m3u8')
  };
}

export async function removeLiveSingleBitrateHLS(ctx: Context, name: string) {
  const serviceAccessToken = await ctx.getServiceAccessToken('ossrs-srs');
  await removeInstance(ctx, 'ossrs-srs', name, serviceAccessToken);
}

export async function listSingleBitrateHLS(
  ctx: Context
): Promise<{ name: string; hlsUrl: URL }[]> {
  const serviceAccessToken = await ctx.getServiceAccessToken('ossrs-srs');

  const instances = await listInstances(ctx, 'ossrs-srs', serviceAccessToken);
  return instances.map((instance: { name: string; url: string }) => {
    return {
      name: instance.name,
      hlsUrl: new URL(instance.url + '/live/livestream.m3u8')
    };
  });
}
