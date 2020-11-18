import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import mailer from '../nodmailer';

@Controller('client/contact')
export class ContactController {
  @Post()
  test(@Body() data: any) {
    mailer(data.email, data.message);
  }
}
