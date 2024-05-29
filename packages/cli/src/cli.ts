#! /usr/bin/env node

import { Command } from 'commander';
import cmdAdmin from './admin/cmd';
import * as cmdUser from './user/cmd';
import cmdTranscode from './transcode/cmd';
import cmdCompare from './vmaf/cmd';

const cli = new Command();

cli
  .configureHelp({ showGlobalOptions: true })
  .option('--env <environment>', 'Environment to use');
cli.addCommand(cmdAdmin());
cli.addCommand(cmdUser.cmdList());
cli.addCommand(cmdUser.cmdCreate());
cli.addCommand(cmdUser.cmdRemove());
cli.addCommand(cmdTranscode());
cli.addCommand(cmdCompare());
cli.parse(process.argv);
