import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { Film, FilmDocument } from 'src/films/schemas/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name, 'afisha')
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDocument[]> {
    const films = await this.filmModel.find().exec();

    return films;
  }

  async findById(filmId: string): Promise<FilmDocument | null> {
    const film = await this.filmModel.findById(filmId).exec();
    if (!film) {
      return null;
    }

    return film;
  }

  async saveOrder(film: FilmDocument): Promise<FilmDocument> {
    return await film.save();
  }
}
