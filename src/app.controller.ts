import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';
import mailer from './database/nodmailer';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/t')
  testReseption(@Body() body: string) {
    console.log(body);
    return;
  }

  @Get('tt')
  @Render('test')
  testmaler() {
    console.log('gg');
    // let template = `<form method="post" action="http://localhost:5500/test/t">
    //   <input type="text" name='name'/>
    //   <input type="submit" />
    // </form>`;
    // mailer('kortas.ahmed.dodo@gmail.com', 'works?', 'yo', template);
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
