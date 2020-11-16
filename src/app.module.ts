import { ClientModule } from './database/client/client.module';
import { AdminModule } from './database/admins.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Admin } from './database/admin.entity';

@Module({
  imports: [
    ClientModule,
    AdminModule,
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
