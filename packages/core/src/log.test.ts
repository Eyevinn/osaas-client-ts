import { Logger } from './log';
import chalk from 'chalk';

describe('Logger', () => {
  beforeAll(() => {
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(Date, 'now').mockImplementation(() => 1686127497000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('can handle log levels', () => {
    const logger = new Logger();

    logger.info('on the info level');
    expect(console.info).toHaveBeenLastCalledWith(
      chalk.white('on the info level')
    );
    logger.error('on the error level');
    expect(console.error).toHaveBeenLastCalledWith(
      chalk.red('on the error level')
    );
    logger.warn('on the warn level');
    expect(console.info).toHaveBeenLastCalledWith(
      chalk.yellow('on the warn level')
    );
    logger.fatal('on the fatal level');
    expect(console.error).toHaveBeenLastCalledWith(
      chalk.redBright('on the fatal level')
    );
  });

  test('no debug output if not in debug mode', () => {
    const logger = new Logger();
    logger.debug('not', 'to be shown');
    expect(console.info).not.toHaveBeenCalled();
  });

  test('no formatting if debug output', () => {
    const logger = new Logger();
    logger.level = 'debug';
    logger.debug({ foo: 'bar' });
    expect(console.info).toHaveBeenLastCalledWith({ foo: 'bar' });
  });
});
