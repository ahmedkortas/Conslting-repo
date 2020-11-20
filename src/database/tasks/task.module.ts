import { TaskService } from './task.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [TaskService, TaskService],
})
export class TaskModule {}
