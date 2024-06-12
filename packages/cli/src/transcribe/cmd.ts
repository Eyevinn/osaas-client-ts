import { Context } from '@osaas/client-core';
import { SubtitlingPool } from '@osaas/client-transcode';
import { Command } from 'commander';

export default function cmdTranscribe() {
  const transcriber = new Command('transcribe');

  transcriber
    .description('Generate subtitles from video or audio using Open AI Whisper')
    .argument('<source>', 'Source URL (supported protocols: http, https)')
    .option('-f, --format <format>', 'Output format (default: vtt)')
    .option('-l, --language <language>', 'Language (default: en)')
    .action(async (source, options, command) => {
      try {
        const globalOpts = command.optsWithGlobals();
        const environment = globalOpts?.env || 'prod';
        const ctx = new Context({ environment });
        const format = options.format || 'vtt';
        const language = options.language || 'en';
        const pool = new SubtitlingPool({ context: ctx, size: 1 });
        if (!process.env.OPENAI_API_KEY) {
          throw new Error('Environment variable OPENAI_API_KEY not set');
        }
        await pool.init({
          openaikey: process.env.OPENAI_API_KEY
        });
        const result = await pool.transcribe(new URL(source), language, format);
        console.log(result);
      } catch (err) {
        console.log((err as Error).message);
      }
    });
  return transcriber;
}
