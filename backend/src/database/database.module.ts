import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module';

import configuration from '../config/configuration';

import { PostgresDatabaseModule } from './postgres-database.module';
import { MongoDatabaseModule } from './mongo-database.module';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const config = configuration();

    const databaseModule =
      config.database.driver === 'mongodb'
        ? MongoDatabaseModule.register()
        : PostgresDatabaseModule.register();

    return {
      module: DatabaseModule,
      imports: [AppConfigModule, databaseModule],
    };
  }
}
