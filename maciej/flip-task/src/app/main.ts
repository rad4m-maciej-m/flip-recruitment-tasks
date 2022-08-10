import { NestFactory } from '@nestjs/core';
import { config } from '~/utils';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(config().port.http);
};

bootstrap();
