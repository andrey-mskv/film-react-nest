import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController (nestjs)', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get(OrderController);
    service = module.get(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call orderService.createOrder with correct dto and return result', async () => {
    const dto: CreateOrderDto = {
      email: 'mail@mail.domain',
      phone: '+71234567890',
      tickets: [
        {
          film: 'film1',
          session: 'session1',
          day: '2026-04-10',
          time: '10:00',
          daytime: 'morning',
          row: 5,
          seat: 8,
          price: 100,
        },
      ],
    };

    const mockResponse = {
      total: 1,
      items: [
        {
          id: 'uuid-1',
          film: 'film1',
          session: 'session1',
          daytime: '2026-04-10 10:00',
          row: 5,
          seat: 8,
          price: 100,
        },
      ],
    };

    service.createOrder.mockResolvedValue(mockResponse);

    const result = await controller.create(dto);

    expect(service.createOrder).toHaveBeenCalledTimes(1);
    expect(service.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toBe(mockResponse);
  });
});
