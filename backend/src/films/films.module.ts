import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entity/films.entity';
import { Schedule } from './entity/filmSchedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
