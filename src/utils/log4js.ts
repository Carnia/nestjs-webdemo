// src/utils/log4js.ts
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as StackTrace from 'stacktrace-js';
import config, { LoggerLevel } from '../config/log4js';

// 注入配置
Log4js.configure(config);

// 实例化
/**
 * 仅仅打印到控制台
 */
export const logger = Log4js.getLogger();
const loggerDebug = Log4js.getLogger('devDebug');
loggerDebug.level = LoggerLevel.TRACE;
const loggerHttp = Log4js.getLogger('http');
loggerHttp.level = LoggerLevel.TRACE;
/**
 * 输出到日志
 */
export class Logger {
  static trace(...args) {
    loggerDebug.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    loggerDebug.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    loggerDebug.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    loggerDebug.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    loggerDebug.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    loggerDebug.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    loggerDebug.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    loggerDebug.fatal(Logger.getStackTrace(), ...args);
  }

  static http(...args) {
    loggerHttp.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep: number = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
