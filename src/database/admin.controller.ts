import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminservice: AdminService) {}

  @Get('')
  getAll() {
    return this.adminservice.findAll();
  }

  @Post('/register/invitation:id')
  create(@Body() data: any) {
    return this.adminservice.createByAdmin(data);
  }

  @Put('/register/invitation/singup:id')
  SingupViaInvitation(@Param('id') id: string, @Body() data: any) {
    return this.adminservice.confirmCreateByAdmin(id, data);
  }

  @Post('/register')
  Create(@Body() data: any) {
    return this.adminservice.create(data);
  }

  @Post('/remove')
  test3(@Body() data: any) {
    return this.adminservice.remove(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    console.log(id);
    // return this.adminservice.update(id, data);
  }
}
