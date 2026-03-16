import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilmsRepository } from 'src/repository/films.repository';
import { OrderResponseDto } from './dto/respose-order.dto';
import { randomUUID } from 'crypto';
import { OrderItemDto } from './dto/order.dto';
import { FilmDocument } from 'src/films/schemas/films.schema';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderResponseDto> {
    // Проверяем наличие билетов в заказе
    this.validateTickets(dto);
    // Проверяем дубликаты билетов в запросе по месту, ряду, сеансу и фильму
    this.checkDuplicatesInRequest(dto);
    // Проверяем наличие фильма, сеанса и свободных мест в базе данных
    const filmsCache = await this.checkSeatsInDb(dto);
    // Сохраняем заказ, обновляя информацию о занятых местах в базе данных
    await this.saveOrder(dto, filmsCache);
    // Формируем и возвращаем ответ с информацией о заказе
    return this.buildResponse(dto);
  }

  private validateTickets(dto: CreateOrderDto): void {
    if (!dto.tickets.length) {
      throw new BadRequestException('Список билетов пуст');
    }
  }

  // Маска ${row}:${seat}:${film}:${session} исключает дублирования билетов в рамках одного заказа.
  private checkDuplicatesInRequest(dto: CreateOrderDto): void {
    const keys = dto.tickets.map(
      (ticket) =>
        `${ticket.row}:${ticket.seat}:${ticket.film}:${ticket.session}`,
    );

    // Set() создает массив с уникальными значениями... size - количество уникальных элементов, а length - общее количество элементов в массиве
    if (keys.length !== new Set(keys).size) {
      throw new BadRequestException('Нельзя занять одно и то же кресло дважды');
    }
  }

  // На входе - DTO с данными заказа, на выходе - Map <key: id фильма, value: данные из БД>
  private async checkSeatsInDb(
    dto: CreateOrderDto,
  ): Promise<Map<string, FilmDocument>> {
    // Кэш для хранения информации о фильмах, чтобы избежать повторных запросов к базе данных
    const filmsCache = new Map<string, FilmDocument>();

    // Проверяем наличие фильма, сеанса и свободных мест в базе данных для каждого билета в заказе
    for (const ticket of dto.tickets) {
      let film = filmsCache.get(ticket.film); // Пытаемся получить данные фильма из кэша

      // Если данные фильма не нашлись в кэше, ищем их в БД и сохраняем в кэш
      if (!film) {
        film = await this.filmsRepository.findById(ticket.film);

        if (!film) {
          throw new NotFoundException(`Фильм с id ${ticket.film} не найден`);
        }

        filmsCache.set(ticket.film, film);
      }

      // Ищем сеанс в расписании фильма для проверки наличия свободных мест
      const schedule = film.schedule.find((item) => item.id === ticket.session);

      if (!schedule) {
        throw new NotFoundException(`Сеанс с id ${ticket.session} не найден`);
      }

      // Формируем ключ для проверки занятости места в формате "ряд:место"
      const seatKey = `${ticket.row}:${ticket.seat}`;

      if (schedule.taken.includes(seatKey)) {
        throw new BadRequestException(`Место ${seatKey} уже занято`);
      }
    }

    return filmsCache;
  }

  private async saveOrder(
    dto: CreateOrderDto,
    filmsCache: Map<string, FilmDocument>,
  ): Promise<void> {
    // Хранилище уникальных id фильмов, которые были обновлены.
    const updatedFilms = new Set<string>();

    for (const ticket of dto.tickets) {
      // Пытаемся получить данные фильма из кэша
      const film = filmsCache.get(ticket.film);

      if (!film) {
        throw new NotFoundException(`Фильм с id ${ticket.film} не найден`);
      }

      // Ищем сеанс в расписании фильма для обновления списка занятых мест
      const schedule = film.schedule.find((item) => item.id === ticket.session);

      if (!schedule) {
        throw new NotFoundException(`Сеанс с id ${ticket.session} не найден`);
      }

      // Добавляем ключ места в список занятых мест
      schedule.taken.push(`${ticket.row}:${ticket.seat}`);
      // Добавляем id фильма в Set обновленных фильмов
      updatedFilms.add(ticket.film);
    }

    for (const filmId of updatedFilms) {
      // Пытаемся получить данные фильма из кэша
      const film = filmsCache.get(filmId);

      if (!film) {
        throw new NotFoundException(`Фильм с id ${filmId} не найден`);
      }

      // Сохраняем обновленные данные фильма в базе данных
      await this.filmsRepository.saveOrder(film);
    }
  }

  private buildResponse(dto: CreateOrderDto): OrderResponseDto {
    const items: OrderItemDto[] = dto.tickets.map((ticket) => ({
      id: randomUUID(),
      film: ticket.film,
      session: ticket.session,
      daytime: ticket.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    }));

    return {
      total: items.length,
      items,
    };
  }
}
