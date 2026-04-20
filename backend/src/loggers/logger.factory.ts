import { INestApplication } from '@nestjs/common';
import { TskvLogger } from './tskvLogger.service';
import { JsonLogger } from './jsonLogger.sevice';
import { DevLogger } from './devLogger.service';

export function getLogger(app: INestApplication) {
  const type = process.env.LOGGER_TYPE;

  switch (type) {
    case 'tskv':
      return app.get(TskvLogger);
    case 'json':
      return app.get(JsonLogger);
    default:
      return app.get(DevLogger);
  }
}
