import {
  Context,
  Log,
  createJob,
  getJob,
  waitForJobToComplete
} from '../src/index';

async function main() {
  const ctx = new Context();

  try {
    const serviceAccessToken = await ctx.getServiceAccessToken(
      'eyevinn-docker-retransfer'
    );

    const job = await createJob(
      ctx,
      'eyevinn-docker-retransfer',
      serviceAccessToken,
      {
        name: 'sdk',
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        cmdLineArgs:
          '-v https://www.eyevinn.se/instagram.ecb3802c.png s3://lab-testcontent-store/birme/'
      }
    );
    await waitForJobToComplete(
      ctx,
      'eyevinn-docker-retransfer',
      job.name,
      serviceAccessToken
    );
    console.log(
      await getJob(
        ctx,
        'eyevinn-docker-retransfer',
        job.name,
        serviceAccessToken
      )
    );
  } catch (err) {
    Log().error(err);
  }
}

main();
