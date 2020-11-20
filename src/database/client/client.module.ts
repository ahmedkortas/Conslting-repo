import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admins.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), AuthModule, AdminModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
