#! /usr/bin/env node

import { Command } from 'commander';
import cmdAdmin from './admin/cmd';
import * as cmdUser from './user/cmd';
import cmdTranscode from './transcode/cmd';
import cmdCompare from './vmaf/cmd';
import cmdPackager from './packager/cmd';
import cmdLive from './live/cmd';
import cmdIntercom from './intercom/cmd';
import cmdTranscribe from './transcribe/cmd';

const cli = new Command();

cli
  .configureHelp({ showGlobalOptions: true })
  .option('--env <environment>', 'Environment to use');
cli.addCommand(cmdAdmin());
cli.addCommand(cmdUser.cmdList());
cli.addCommand(cmdUser.cmdCreate());
cli.addCommand(cmdUser.cmdRemove());
cli.addCommand(cmdTranscode());
cli.addCommand(cmdPackager());
cli.addCommand(cmdCompare());
cli.addCommand(cmdLive());
cli.addCommand(cmdIntercom());
cli.addCommand(cmdTranscribe());
cli.parse(process.argv);
