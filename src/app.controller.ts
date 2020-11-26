import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';
import mailer from './database/nodmailer';
const bcrypt = require('bcrypt');

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/t')
  async testReseption(@Body() body: any) {
    console.log(body);
    const hasehd = await bcrypt.hash(body.email, 5);
    let result = 'http://localhost:3000/invitation/admin/' + hasehd;
    mailer(body.email, result, 'yoyo', '');
    return result;
  }

  @Post('tt')
  async testmaler(@Body() data: any) {
    console.log(data);
    let result = await bcrypt.compare(data.email, data.hashed);
    return result;
  }

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
