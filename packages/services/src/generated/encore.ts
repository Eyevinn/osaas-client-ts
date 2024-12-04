export type Encore =
  paths['/encoreinstance/{id}']['get']['responses']['200']['schema'];

export type EncoreConfig =
  paths['/encoreinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

export async function createEncoreInstance(
  ctx: Context,
  body: EncoreConfig
): Promise<Encore> {
  const serviceAccessToken = await ctx.getServiceAccessToken('encore');
  return await createInstance(ctx, 'encore', serviceAccessToken, body);
}

export type Encore =
  paths['/encoreinstance/{id}']['get']['responses']['200']['schema'];

export type EncoreConfig =
  paths['/encoreinstance']['post']['parameters']['body']['body'];

import { Context, createInstance } from '@osaas/client-core';

export async function createEncoreInstance(
  ctx: Context,
  body: EncoreConfig
): Promise<Encore> {
  const serviceAccessToken = await ctx.getServiceAccessToken('encore');
  return await createInstance(ctx, 'encore', serviceAccessToken, body);
}
