import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Ports } from 'src/constants';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.TCP,
      options: {
        port: Ports.products,
      },
    },
  );
  await app.listen();
}
bootstrap();
