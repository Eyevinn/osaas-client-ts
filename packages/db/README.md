# @osaas/client-db

SDK for Open Source Cloud DB services

## Usage

Prerequisites

- An account on [Open Source Cloud](www.osaas.io)

```
npm install --save @osaas/client-db
```

Example code creating a Valkey database and use a Redis client to connect with it

```javascript
import { Context, Log } from '@osaas/client-core';
import { ValkeyDb } from '@osaas/client-db';
import Redis from 'ioredis';

async function main() {
  const context = new Context();
  try {
    const db = new ValkeyDb({ context, name: 'mydb' });
    await db.init();
    const redisUrl = await db.getRedisUrl();

    const client = new Redis({ host: redisUrl.hostname, port: redisUrl.port });
  } catch (err) {
    Log().error(err);
  }
}

main();
```