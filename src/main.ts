import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  app.enableCors();
  app.setBaseViewsDir(__dirname);
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT || 5500);
}
bootstrap();
