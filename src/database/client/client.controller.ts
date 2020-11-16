import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('/Client')
export class ClientController {
  constructor(private readonly clientservice: ClientService) {}

  @Get('')
  test1() {
    return this.clientservice.findAll();
  }

  @Post('/register')
  create(@Body() data: any) {
    return this.clientservice.create(data);
  }

  @Post('/remove')
  delete(@Body() data: any) {
    return this.clientservice.remove(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    console.log(id);
    return this.clientservice.update(id, data);
  }
}
