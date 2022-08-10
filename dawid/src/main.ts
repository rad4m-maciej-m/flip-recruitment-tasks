import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PortPath } from './Utils/port';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(PortPath.main);
};

bootstrap();
