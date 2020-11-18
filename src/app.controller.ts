import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  init(@Body() data: any): string {
    console.log(data);
    return data;
  }

  @Get('/nahed')
  getHello(@Body() body: Body): string {
    return this.appService.getHello(body);
  }

  @Post('ahmed')
  posthello(@Body() body: Body): string {
    return this.appService.posthello(body);
  }
}
