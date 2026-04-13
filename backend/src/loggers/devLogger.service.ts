import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  private readonly logger = new ConsoleLogger(DevLogger.name, {
    prefix: 'FilmApp',
    logLevels: ['error', 'log'],
  });

  error(message: unknown, stack?: unknown, context?: string): void {
    this.logger.error(`[DEV ERROR] ${message}`, stack, context);
  }

  log(message: unknown, context?: string) {
    this.logger.log(`[DEV] ${message}`, context);
  }
}
