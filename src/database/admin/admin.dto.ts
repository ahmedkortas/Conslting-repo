import { Exclude } from 'class-transformer';

export class AdminEntity {
  id: number;
  name: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
}
