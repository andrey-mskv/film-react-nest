import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type DatabaseDriver = 'mongodb' | 'postgres';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get port(): number {
    return this.config.getOrThrow<number>('port');
  }

  get databaseDriver(): DatabaseDriver {
    return this.config.getOrThrow<DatabaseDriver>('database.driver');
  }

  get mongoUrl(): string {
    return this.config.getOrThrow<string>('database.mongodb.url');
  }

  get postgres() {
    return {
      host: this.config.getOrThrow<string>('database.postgres.host'),
      port: this.config.getOrThrow<number>('database.postgres.port'),
      name: this.config.getOrThrow<string>('database.postgres.name'),
      username: this.config.getOrThrow<string>('database.postgres.username'),
      password: this.config.getOrThrow<string>('database.postgres.password'),
    };
  }
}
