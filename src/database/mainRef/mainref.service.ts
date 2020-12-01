import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainRef } from './MainRefference.entity';

@Injectable()
export class MainRefService {
  constructor(
    @InjectRepository(MainRef)
    private mainRefReository: Repository<MainRef>,
  ) {}

  findAll(): Promise<MainRef[]> {
    return this.mainRefReository.find();
  }

  create(data: MainRef): Promise<MainRef> {
    return this.mainRefReository.save(data);
  }
}
