import { Body, Controller, Get, Post } from '@nestjs/common';
import { MainRefService } from './mainref.service';

@Controller('/References')
export class MainRefController {
  constructor(private readonly mainService: MainRefService) {}

  @Get('')
  getall() {
    return this.mainService.findAll();
  }

  @Post('add')
  postNewReference(@Body() data: any) {
    return this.mainService.create(data);
  }
}
