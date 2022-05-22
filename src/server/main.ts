import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app
    .listen(port)
    .then(() => Logger.log(`Listening on http://localhost:${port}`));
}
bootstrap();
