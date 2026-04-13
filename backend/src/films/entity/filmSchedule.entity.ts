import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Film } from './films.entity';

@Entity('schedule')
export class Schedule {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamptz' })
  daytime: Date;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('text', { array: true })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
