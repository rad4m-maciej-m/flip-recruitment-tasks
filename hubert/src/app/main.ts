import { NestFactory } from '@nestjs/core';
import { Ports } from 'src/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Ports.http);
}
bootstrap();
