# @osaas/client-ai

SDK for interacting with ai services

## Usage

Prerequisites

- An account on [Open Source Cloud](www.osaas.io)

```
npm install --save @osaas/client-ai
```

Example code

```javascript
import { Context, Log } from '@osaas/client-core';
import { ChatClient } from '@osaas/client-ai';

async function main(question: string) {
  const ctx = new Context();

  try {
    const chat = new ChatClient({
      context: ctx
    });
    await chat.init();

    const response = await chat.sendChat(question);
    console.log(response.message);
  } catch (err) {
    console.log((err as Error).message);
  }
}

main("How can I create a FASY channel?");
```


## About Open Source Cloud

Open Source Cloud reduces the barrier to get started with open source without having to host it on your own infrastructure.

Start building software solutions based on open and detachable ready-to-run cloud components with Open Source Cloud. Full code transparency, never locked in and a business model that contributes back to the open source community. Offering a wide range of components from media and more to help you build the best solution for you and your users.

www.osaas.io
