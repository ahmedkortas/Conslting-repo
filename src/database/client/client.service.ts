import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Client } from './client.entity';
import mailer from '../nodmailer';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private authService: AuthService,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async create(data) {
    const exists = await this.clientRepository.findOne({
      where: { email: data.email },
    });
    if (exists === undefined) {
      if (exists === undefined) {
        const passHash = await this.authService.hashPassword(data.password);
        let client: object = {
          name: data.name,
          password: passHash,
          email: data.email,
          phoneNumber: data.phoneNumber,
        };

        return from(this.clientRepository.save(client)).pipe(
          map((res: any) => {
            let msg = `hey dear ${res.name},we welcome you
            in Irada consulting. we are looking forward for working with you`;
            mailer(res.email, msg, 'Welcom dear new client', '');
            const { password, ...result } = res;
            return result;
          }),
        );
      }

      const { password, ...result } = exists;

      return result;
    }
  }

  findOneByName(name: any): Promise<Client> {
    return this.clientRepository.findOne({ name });
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

  /**
   *
   * @param username
   * find an admin by username
   */

  findOneByUsername(email: any) {
    return this.clientRepository.findOne({
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
    console.log(data);
    const theClient = await this.findOneByUsername(data.email);
    if (theClient === undefined) {
      throw new Error();
    }
    console.log(theClient);

    const compare = await this.authService.ComparePassword(
      theClient.password,
      data.password,
    );
    if (compare) {
      const { password, ...result } = theClient;
      return result;
    } else {
      throw false;
    }
  }
}
