import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(
    level: string,
    message: any,
    context?: string,
    extra?: Record<string, any>,
  ): string {
    const base: Record<string, any> = {
      level,
      msg: message,
      context,
      time: new Date().toISOString(),
      pid: process.pid,
      ...extra,
    };

    return (
      'tskv\t' +
      Object.entries(base)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${this.escape(v)}`)
        .join('\t')
    );
  }

  private escape(value: any): string {
    return String(value)
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/=/g, '\\=');
  }

  log(message: any, context?: string) {
    console.log(this.format('log', message, context));
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
