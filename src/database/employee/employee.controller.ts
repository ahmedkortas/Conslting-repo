import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

  @Get('')
  test1() {
    return this.EmployeeService.findAll();
  }

  @Post('/register')
  create(@Body() data: any) {
    return this.EmployeeService.create(data);
  }

  @Post('/login')
  login(@Body() data: any) {
    return this.EmployeeService.login(data);
  }

  @Post('/remove')
  delete(@Body() data: any) {
    return this.EmployeeService.remove(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    console.log(id);
    return this.EmployeeService.update(id, data);
  }
}
