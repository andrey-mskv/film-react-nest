export class FilmScheduleDto {
  id: string;
  daytime: Date;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmScheduleResponseDto {
  items: FilmScheduleDto[];
  total: number;
}
