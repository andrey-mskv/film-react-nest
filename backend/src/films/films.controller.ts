import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms(): Promise<FilmsResponseDto> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') filmId: string) {
    return this.filmsService.getFilmSchedule(filmId);
  }
}
