import { Context, Log } from '@osaas/client-core';
import { ChatClient, EmbeddingsClient } from '../src/index';

async function main() {
  const ctx = new Context();

  try {
    const embeddings = new EmbeddingsClient({ context: ctx });
    await embeddings.init();

    const data = await embeddings.getEmbeddings();
    Log().info(data);

    const toEmbed = [
      { id: '1', data: 'hello', metadata: {} },
      { id: '2', data: 'world', metadata: {} }
    ];
    await embeddings.upsertEmbeddings(toEmbed);

    await embeddings.deleteEmbeddings(['1', '2']);

    const chat = new ChatClient({ context: ctx });
    await chat.init();

    const response = await chat.sendChat('Hello world');
    Log().info(response);
  } catch (err) {
    Log().error(err);
  }
}

main();
