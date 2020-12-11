import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
const bcrypt = require('bcrypt');
import mailer from '../nodmailer';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminservice: AdminService) {}

  @Get('')
  getAll() {
    return this.adminservice.findAll();
  }

  @Post('/register/invitation')
  async create(@Body() data: any) {
    return this.adminservice.createByAdmin(data);
  }

  @Put('/register/invitation/singup:id')
  SingupViaInvitation(@Param('id') id: string, @Body() data: any) {
    return this.adminservice.confirmCreateByAdmin(id, data);
  }

  @Post('/register')
  Create(@Body() data: any) {
    console.log(data);
    return this.adminservice.create(data);
  }

  @Post('/remove')
  test3(@Body() data: any) {
    return this.adminservice.remove(data);
  }

  @Put('/register/invitation/singup')
  async update(@Body() data: any) {
    let result = await bcrypt.compare(data.email, data.hashed);
    if (result) {
      let { hashed, ...b } = data;
      return this.adminservice.update(data.email, b);
    } else {
      return false;
    }
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() data: any) {
    return await this.adminservice.login(data);
  }
}
