import { Controller, Get, Post, Body, Put } from '@nestjs/common';

import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  getAll() {
    return this.taskService.findAll();
  }

  @Post('/Employee')
  getAllForEmployee(@Body() data: string) {
    console.log(data);
    return this.taskService.findAllEmployeeTask(data);
  }

  @Post('/create')
  create(@Body() data: any) {
    return this.taskService.create(data);
  }

  @Put('/update')
  update(@Body() data: any) {
    return this.taskService.update(data);
  }
}
