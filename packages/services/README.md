# @osaas/client-services

Automatically generated typed service resources.

## Usage

```javascript
import { Context, Log } from '@osaas/client-core';
import { createEyevinnTestAdserverInstance } from '@osaas/client-services';

const ctx = new Context();

try {
  const instance = await createEyevinnTestAdserverInstance(ctx, {
    name: 'sdk'
  });
  console.log(instance.url);
} catch (err) {
  Log().error(err);
}
```

## Development

Generate types and functions

```
% CATALOG_SVC_URL=https://catalog.svc.prod.osaas.io \
  CATALOG_SVC_API_KEY=<key> \
  npm run generate
```

Build

```
% npm run build
```
