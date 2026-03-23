import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './filmSchedule.entity';

@Entity()
export class Film {
  @PrimaryColumn()
  id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
