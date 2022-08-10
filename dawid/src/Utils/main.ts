import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { type ProductsModule } from 'src/Products/products.module';
import { TasksModule } from 'src/Tasks/tasks.module';
import { PortPath } from './port';

type Module = ProductsModule | TasksModule;

export const createMicroservice = async (port: PortPath, md: Module) => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(md, {
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  await app.listen();
};
