import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainRefController } from './mainref.controller';
import { MainRefService } from './mainref.service';
import { MainRef } from './MainRefference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainRef])],
  controllers: [MainRefController],
  providers: [MainRefService],
})
export class MainRefModule {}
