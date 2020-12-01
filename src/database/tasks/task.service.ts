import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findAllEmployeeTask(data): Promise<Task[]> {
    let { EmployeeName } = data;
    return this.taskRepository.find({ EmployeeName });
  }

  async create(task: Task): Promise<Task> {
    const admin = await this.taskRepository.create(task);
    return this.taskRepository.save(admin);
  }
}
