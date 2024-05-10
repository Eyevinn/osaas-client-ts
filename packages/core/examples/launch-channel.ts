import { Context, Log, createInstance, getInstance } from '../src/index';

async function main() {
  const ctx = new Context();

  try {
    const serviceAccessToken = await ctx.getServiceAccessToken(
      'channel-engine'
    );

    const instance = await createInstance(
      ctx,
      'channel-engine',
      serviceAccessToken,
      {
        name: 'sdk',
        type: 'Playlist',
        url: 'https://gist.githubusercontent.com/birme/bc8854436a2b3cdbc891efdaa960b528/raw/52fcdfba0cf05ca8c13185b27e6767d6ebdd8a7f/gistfile1.txt',
        opts: {
          useDemuxedAudio: false,
          useVttSubtitles: false,
          preroll: {
            url: 'http://maitv-vod.lab.eyevinn.technology/VINN.mp4/master.m3u8',
            duration: 10500
          }
        }
      }
    );
    console.log(instance.playback);
  } catch (err) {
    Log().error(err);
  }
}

main();
