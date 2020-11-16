import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async create(data) {
    const exists = await this.clientRepository.findOne({
      where: { email: data.email },
    });
    if (exists === undefined) {
      const client = await this.clientRepository.create(data);
      await this.clientRepository.save(client);
      return client;
    }

    return exists;
  }

  findOne(id: string): Promise<Client> {
    return this.clientRepository.findOne(id);
  }

  async remove(email: string) {
    await this.clientRepository.delete(email);
    return { delete: true };
  }

  async update(id, data) {
    await this.clientRepository.update({ id }, data);
    return this.clientRepository.findOne(id);
  }
}
