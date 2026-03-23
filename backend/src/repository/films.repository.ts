import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entity/films.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/films/entity/filmSchedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepo.find();
  }

  async findById(filmId: string): Promise<Film | null> {
    const film = await this.filmRepo.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });
    if (!film) {
      return null;
    }

    return film;
  }

  async saveOrder(film: Film): Promise<Film> {
    return await this.filmRepo.save(film);
  }
}
