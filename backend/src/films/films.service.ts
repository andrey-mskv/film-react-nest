import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto, FilmsResponseDto } from './dto/films.dto';
import {
  FilmScheduleDto,
  FilmScheduleResponseDto,
} from './dto/filmSchedule.dto';
import { Film } from './entity/films.entity';
import { Schedule } from '../films/entity/filmSchedule.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  // Маппинг данных из БД в DTO для ответа клиенту
  private mapFilmToDto(film: Film): FilmDto {
    return {
      id: film.id.toString(),
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
    };
  }

  async findAll(): Promise<FilmsResponseDto> {
    const films = await this.filmsRepository.findAll();
    const items = films.map((film) => this.mapFilmToDto(film));

    return {
      items,
      total: items.length,
    };
  }

  private mapScheduleToDto(schedule: Schedule): FilmScheduleDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }

  async getFilmSchedule(filmId: string): Promise<FilmScheduleResponseDto> {
    const film = await this.filmsRepository.findById(filmId);

    if (!film) {
      throw new NotFoundException(`Фильм с id ${filmId} не найден`);
    }

    const items = film.schedule.map((schedule) =>
      this.mapScheduleToDto(schedule),
    );

    return {
      items,
      total: film.schedule.length,
    };
  }
}
