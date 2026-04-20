import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private format(level: string, message: any, context?: string, meta?: any) {
    return JSON.stringify({
      level,
      message,
      context,
      meta,
      timestamp: new Date().toISOString(),
      pid: process.pid,
    });
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.format('log', message, ...optionalParams));
  }

  error(message: any, stack?: string, context?: string) {
    console.error(this.format('error', message, context, { stack }));
  }

  warn(message: any, context?: string) {
    console.warn(this.format('warn', message, context));
  }

  debug(message: any, context?: string) {
    console.debug(this.format('debug', message, context));
  }

  verbose(message: any, context?: string) {
    console.info(this.format('verbose', message, context));
  }
}
