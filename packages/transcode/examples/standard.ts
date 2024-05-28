import { Context, Log } from '@osaas/client-core';
import { QueuePool } from '../src/index';

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
      {
        duration: 5
      }
    );
    await pool.destroy();
  } catch (err) {
    Log().error(err);
  }
}

main();
