# @osaas/client-intercom

SDK for Open Source Cloud Intercom

## Usage

Prerequisites

- An account on [Open Source Cloud](www.osaas.io)

```
npm install --save @osaas/client-intercom
```

Example code

```javascript
import { Context, Log } from '@osaas/client-core';
import { IntercomSystem } from '@osaas/client-intercom';

async function main() {
  const ctx = new Context();
  try {
    const intercom = new IntercomSystem({ context: ctx, name });
    await intercom.init();
    const p = await intercom.createProduction('myproduction', ['line1', 'line2', 'line3']);
    console.log(`Production '${p.name}' created with id ${p.productionId}`);
  } catch (err) {
    Log().error(err);
  }
}

main();
```

## About Open Source Cloud

Open Source Cloud reduces the barrier to get started with open source without having to host it on your own infrastructure.

Start building software solutions based on open and detachable ready-to-run cloud components with Open Source Cloud. Full code transparency, never locked in and a business model that contributes back to the open source community. Offering a wide range of components from media and more to help you build the best solution for you and your users.

www.osaas.io
