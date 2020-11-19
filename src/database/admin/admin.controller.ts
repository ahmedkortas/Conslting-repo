import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    console.log(data);
    return this.adminservice.create(data);
  }

  @Post('/remove')
  test3(@Body() data: any) {
    return this.adminservice.remove(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    console.log(id);
    return this.adminservice.update(id, data);
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
