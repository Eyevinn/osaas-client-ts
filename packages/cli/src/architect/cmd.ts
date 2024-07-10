import { Context } from '@osaas/client-core';
import { Command } from 'commander';
import { ChatClient } from '@osaas/client-ai';
import { prompt } from 'promptly';
import ora from 'ora-classic';

export function cmdChat() {
  const chat = new Command('chat');

  chat
    .description('Chat with AI assistant for Osaas')
    .action(async (options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const chat = new ChatClient({
          context: ctx
        });
        await chat.init();

        let message = await prompt(' > ', { trim: true });
        while (message !== 'exit') {
          if (message === undefined || message.length === 0) continue;
          const spinner = ora('').start();
          const response = await chat.sendChat(message);
          spinner.stop();
          console.log(`@: ${response.message}`);
          message = await prompt(' > ', { trim: true });
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    });

  const architect = new Command('architect');
  architect.addCommand(chat);

  return architect;
}
