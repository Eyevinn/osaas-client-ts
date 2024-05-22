import { createSigner } from 'fast-jwt';
import { randomUUID } from 'node:crypto';

function readPatSecret(): string {
  if (!process.env.PAT_SECRET) {
    throw new Error('PAT_SECRET must be set');
  }
  return process.env.PAT_SECRET;
}

export function generatePat(
  tenantId: string,
  userId: string,
  serviceLimits?: number
) {
  const signSync = createSigner({
    key: readPatSecret(),
    iss: 'token.osaas.eyevinn.se'
  });

  const iat = Math.round(Date.now() / 1000);
  const patId = randomUUID();
  const jwtClaims = {
    iat,
    tenantId,
    userId,
    patId,
    serviceLimits
  };
  const token = signSync(jwtClaims);
  return token;
}
