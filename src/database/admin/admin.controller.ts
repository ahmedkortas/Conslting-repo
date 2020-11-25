import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';

import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminservice: AdminService) {}

  @Get('')
  getAll() {
    return this.adminservice.findAll();
  }

  @Post('/register/invitation')
  create(@Body() data: any) {
    console.log(data);
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

  @Put(':email')
  update(@Param('email') email: string, @Body() data: any) {
    return this.adminservice.update(email, data);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() data: any) {
    return await this.adminservice.login(data);
  }

  // @Post('/test')
  // test1(@Body() data: any) {
  //   console.log('test1', data.name);

  // }
}
