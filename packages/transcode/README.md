# @osaas/client-transcode

SDK for transcoding with Encore in Open Source Cloud and transfer result to S3 bucket

## Usage

Prerequisites

- An account on [Open Source Cloud](www.osaas.io)

```
npm install --save @osaas/client-transcode
```

Example code

```javascript
import { Context, Log } from '@osaas/client-core';
import { QueuePool } from '@osaas/client-transcode';

async function main() {
  const ctx = new Context();

  try {
    const pool = new QueuePool({ context: ctx });
    await pool.init();
    await pool.transcode(
      new URL(
        'https://testcontent.eyevinn.technology/mp4/stswe-tvplus-promo.mp4'
      ),
      new URL('s3://lab-testcontent-store/birme/'),
      {}
    );
    await pool.destroy();
  } catch (err) {
    Log().error(err);
  }
}

main();
```

Transcode and create streaming package

```javascript
import { Context, Log } from '@osaas/client-core';
import { QueuePool } from '@osaas/client-transcode';

async function main() {
  const ctx = new Context();

  try {
    const pool = new QueuePool({ context: ctx, usePackagingQueue: true });
    await pool.init();
    await pool.transcode(
      new URL(
        'https://testcontent.eyevinn.technology/mp4/stswe-tvplus-promo.mp4'
      ),
      new URL('s3://lab-testcontent-store/birme/'),
      {
        packageDestination: new URL(
          's3://lab-testcontent-storate/birme/output/'
        )
      }
    );
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
