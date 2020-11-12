import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/nahed')
  getHello(@Body() body: Body): string {
    return this.appService.getHello(body);
  }

  @Post('ahmed')
  posthello(@Body() body: Body): string {
    return this.appService.posthello(body);
  }
}
