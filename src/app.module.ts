import { MainRefController } from './database/mainRef/mainref.controller';
import { MainRefService } from './database/mainRef/mainref.service';
import { MainRefModule } from './database/mainRef/mainref.module';
import { EmployeeModule } from './database/employee/employee.module';
import { TaskModule } from './database/tasks/task.module';
import { AuthModule } from './database/auth/auth.module';
import { AuthService } from './database/auth/auth.service';
import { ContactModule } from './database/contact/contact.module';
import { ClientModule } from './database/client/client.module';
import { AdminModule } from './database/admin/admins.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Admin } from './database/admin/admin.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MainRefModule,
    EmployeeModule,
    TaskModule,
    ContactModule,
    ClientModule,
    AdminModule,
    ContactModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'hattie.db.elephantsql.com',
      port: 5432,
      username: 'qsgwmjfi',
      password: 'YWbc7bgMySyPKzuaauQyGKuyNV2_xLX2',
      database: 'qsgwmjfi',
      entities: [Admin],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
