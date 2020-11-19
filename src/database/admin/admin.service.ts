import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import mailer from '../nodmailer';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AdminEntity } from './admin.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private authService: AuthService,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async createByAdmin(data: any) {
    console.log(data);
    const exists = await this.adminRepository.findOne({
      where: { email: data.email },
    });
    if (exists === undefined) {
      data.name = 'xXx';
      data.password = '0000';
      const admin = await this.adminRepository.create(data);
      await this.adminRepository.save(admin);
      mailer(
        data.email,
        data.message,
        "You've been invited to be an admin in Irada",
      );
      return admin;
    }
    return exists;
  }

  async confirmCreateByAdmin(id, data) {
    const newAdmin = await this.adminRepository.findOne(id);
    if (newAdmin.name === 'xXx') {
      await this.adminRepository.update({ id }, data);
    }
    return this.adminRepository.findOne(id);
  }

  async create(data) {
    const exists = await this.adminRepository.findOne({
      where: { email: data.email },
    });
    if (exists === undefined) {
      const passHash = await this.authService.hashPassword(data.password);
      let newAdmin: object = {
        name: data.name,
        password: passHash,
        email: data.email,
      };
      return from(this.adminRepository.save(newAdmin)).pipe(
        map((res: any) => {
          const { password, ...result } = res;
          return result;
        }),
      );
    }

    const { password, ...result } = exists;

    return result;
  }

  findOneByUsername(username: any) {
    return this.adminRepository.findOne({
      where: { name: username },
    });
  }

  async login(data: any) {
    const confirmed = await this.validate(data);
    if (confirmed) {
      const token = await this.authService.generatJWT(data);
      return token;
    }
  }

  async validate(data) {
    console.log(data);
    const theAdmin = await this.findOneByUsername(data.name);
    if (theAdmin === undefined) {
      throw new Error();
    }
    console.log(theAdmin);
    // return from(
    //   this.authService.ComparePassword(admin.password, data.password).pipe(
    //     map((res: boolean) => {
    //       if (res) {
    //         const { password, ...result } = admin;
    //         return result;
    //       } else {
    //         throw new Error();
    //       }
    //     }),
    //   ),
    // );

    const compare = await this.authService.ComparePassword(
      theAdmin.password,
      data.password,
    );
    if (compare) {
      const { password, ...result } = theAdmin;
      return result;
    } else {
      throw false;
    }
  }

  findOneById(id: string): Promise<Admin> {
    return this.adminRepository.findOne(id);
  }

  async remove(email: string) {
    await this.adminRepository.delete(email);
    return { delete: true };
  }

  async update(id, data) {
    await this.adminRepository.update({ id }, data);
    return this.adminRepository.findOne(id);
  }
}
