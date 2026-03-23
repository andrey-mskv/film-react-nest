import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entity/films.entity';
import { Schedule } from '../films/entity/filmSchedule.entity';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';

@Module({})
export class PostgresDatabaseModule {
  static register(): DynamicModule {
    return {
      module: PostgresDatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: (config: AppConfigService) => {
            const pg = config.postgres;

            return {
              type: 'postgres',
              host: pg.host,
              port: pg.port,
              username: pg.username,
              password: pg.password,
              database: pg.name,
              entities: [Film, Schedule],
              synchronize: true,
            };
          },
        }),
      ],
    };
  }
}
