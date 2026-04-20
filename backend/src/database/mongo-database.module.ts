import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';

@Module({})
export class MongoDatabaseModule {
  static register(): DynamicModule {
    return {
      module: MongoDatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: (config: AppConfigService) => ({
            uri: config.mongoUrl,
          }),
        }),
      ],
    };
  }
}
