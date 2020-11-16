import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async create(data) {
    console.log(data);
    const exists = await this.adminRepository.findOne({
      where: { email: data.email },
    });
    // const admin = await this.adminRepository.create(data);
    // await this.adminRepository.save(admin);
    console.log(exists);
    return exists;
  }

  findOne(id: string): Promise<Admin> {
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
