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
  startDate: Date;

  @Column()
  DueDate: Date;

  @Column()
  status: string;
}
