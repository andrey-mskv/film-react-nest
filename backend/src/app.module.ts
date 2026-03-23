import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import configuration from './config/configuration';

import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { FilmImportService } from './import-films/import-films.service';
import { Film } from './films/entity/films.entity';

console.log(__dirname);
console.log('cwd:', process.cwd());

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule.register(),
    FilmsModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
})
export class AppModule {}
