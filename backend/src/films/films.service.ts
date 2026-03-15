import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmDocument } from './schemas/films.schema';
import { FilmsRepository } from 'src/repository/films.repository';
import { FilmDto, FilmsResponseDto } from './dto/films.dto';
import {
  FilmScheduleDto,
  FilmScheduleResponseDto,
} from './dto/filmSchedule.gto';
import { FilmSchedual } from './schemas/filmSchedule.schema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  // Маппинг данных из БД в DTO для ответа клиенту
  private mapFilmToDto(film: FilmDocument): FilmDto {
    return {
      id: film._id.toString(),
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

  private mapScheduleToDto(schedule: FilmSchedual): FilmScheduleDto {
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

    console.log('Полученный фильм:', film); // Лог для проверки данных из БД

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
