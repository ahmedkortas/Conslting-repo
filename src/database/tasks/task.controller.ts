import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  getAll() {
    return this.taskService.findAll();
  }

  @Post('/create')
  create(@Body() data: any) {
    return this.taskService.create(data);
  }
}
