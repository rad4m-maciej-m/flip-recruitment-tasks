import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Ports } from 'src/constants';
import { TaskModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskModule,
    {
      transport: Transport.TCP,
      options: {
        port: Ports.tasks,
      },
    },
  );
  await app.listen();
}
bootstrap();
