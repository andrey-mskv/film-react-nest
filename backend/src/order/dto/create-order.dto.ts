import { CreateTicketDto } from './create-ticket.dto';

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: CreateTicketDto[];
}
