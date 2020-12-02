import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MainRef {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  project: string;

  @Column()
  Natureofthestudy: string;

  @Column()
  Client: string;

  @Column()
  date: Date;

  @Column('integer', { default: 0 })
  vue: number;
}
