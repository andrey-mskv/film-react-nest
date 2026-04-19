import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { DevLogger } from './loggers/devLogger.service';
import { JsonLogger } from './loggers/jsonLogger.sevice';
import { TskvLogger } from './loggers/tskvLogger.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule.register(),
    FilmsModule,
    OrderModule,
    HealthModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  providers: [DevLogger, JsonLogger, TskvLogger],
  exports: [DevLogger, JsonLogger, TskvLogger],
})
export class AppModule {}
