import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Employee } from './employee.entity';
import mailer from '../nodmailer';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private authService: AuthService,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async create(data) {
    const exists = await this.employeeRepository.findOne({
      where: { email: data.email },
    });
    if (exists === undefined) {
      if (exists === undefined) {
        const passHash = await this.authService.hashPassword(data.password);
        let employee: object = {
          name: data.name,
          password: passHash,
          email: data.email,
          phoneNumber: data.phoneNumber,
        };
        return from(this.employeeRepository.save(employee)).pipe(
          map((res: any) => {
            let msg = `hey dear ${res.name},we are proud to have you 
            in our familly we hope that we will work together for a long
            tine`;
            mailer(res.email, msg, 'Welcom dear new Employee', '');
            const { password, ...result } = res;
            return result;
          }),
        );
      }

      const { password, ...result } = exists;

      return result;
    }
  }

  findOne(id: string): Promise<Employee> {
    return this.employeeRepository.findOne(id);
  }

  async remove(email: string) {
    await this.employeeRepository.delete(email);
    return { delete: true };
  }

  async update(data) {
    let email = data.email;
    await this.employeeRepository.update({ email }, data);
    return this.employeeRepository.findOne({ email });
  }

  /**
   *
   * @param username
   * find an admin by username
   */

  findOneByUsername(email: any) {
    return this.employeeRepository.findOne({
      where: { email },
    });
  }

  /**
   *
   * @param data
   * login confirmation or denied and send the token
   */
  async login(data: any) {
    const confirmed = await this.validate(data);
    if (confirmed) {
      const token = await this.authService.generatJWT(data);
      return token;
    }
  }

  /**
   *
   * @param data
   * validate login data
   */

  async validate(data) {
    const theEmployee = await this.findOneByUsername(data.email);
    if (theEmployee === undefined) {
      return false;
    }

    const compare = await this.authService.ComparePassword(
      theEmployee.password,
      data.password,
    );
    if (compare) {
      const { password, ...result } = theEmployee;
      return result;
    } else {
      return false;
    }
  }
}
