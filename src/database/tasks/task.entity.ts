import { Employee } from './../employee/employee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EmployeeName: string;

  @Column()
  ClientName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  startedAt: Date;

  @Column()
  DueDate: Date;
}
