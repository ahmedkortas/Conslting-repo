import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req): string {
    console.log(req);
    return 'Hello nahed!';
  }
  posthello(body): string {
    console.log(body);
    return 'Hello World!';
  }
}
