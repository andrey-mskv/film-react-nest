import { Test } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController (integration)', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn(),
            getFilmSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(FilmsController);
    service = module.get(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('should return films from service (via repository)', async () => {
      const mockFilms = [
        {
          id: '1',
          rating: 8.5,
          director: 'Nolan',
          tags: ['sci-fi'],
          image: 'img.jpg',
          cover: 'cover.jpg',
          title: 'Film 1',
          about: 'space',
          description: 'desc',
        },
      ];

      service.findAll.mockResolvedValue({
        items: mockFilms,
        total: mockFilms.length,
      });

      const result = await controller.getFilms();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        items: mockFilms,
        total: mockFilms.length,
      });
    });
  });

  describe('getFilmSchedule', () => {
    it('should return schedule for film', async () => {
      const mockFilmId = '1';

      const mockResponse = {
        items: [
          {
            id: '1',
            daytime: new Date('2024-01-01T10:00:00'),
            hall: 1,
            rows: 10,
            seats: 100,
            price: 150,
            taken: [],
          },
        ],
        total: 1,
      };

      service.getFilmSchedule.mockResolvedValue(mockResponse);

      const result = await controller.getFilmSchedule(mockFilmId);

      expect(service.getFilmSchedule).toHaveBeenCalledWith(mockFilmId);
      expect(result).toEqual(mockResponse);
    });
  });
});
