import { Injectable } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs/operators';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const admin = await this.adminservice.findOneByUsername(username);
  //   if (admin && admin.password === pass) {
  //     console.log(admin.password);
  //     const { password, ...result } = admin;
  //     return result;
  //   }
  //   return null;
  // }
  async generatJWT(payload: object) {
    const token = await this.jwtService.sign({ admin: payload });
    return token;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 5);
  }

  async ComparePassword(password: string, commingPassword: string) {
    const comp = await bcrypt.compare(commingPassword, password);
    console.log(comp);
    return comp;
  }
}
