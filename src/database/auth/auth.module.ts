import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admins.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategie';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) => ({
        secret: 'fjshudfyurwqgyhdcufyvejfhcgwvqgHGFYU',
        signOptions: { expiresIn: '1000s' },
      }),
    }),
  ],
  providers: [AuthService, JwtModule],
  exports: [AuthService],
})
export class AuthModule {}
