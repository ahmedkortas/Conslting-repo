import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { EmployeeModule } from '../employee/employee.module';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), EmployeeModule, ClientModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
