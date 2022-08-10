import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from './config';

type MicroserviceNames = keyof ReturnType<typeof config>['port']['service'];

export const createMicroservice = async (mod: any, name: MicroserviceNames) => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(mod, {
    transport: Transport.TCP,
    options: {
      port: config().port.service[name],
    },
  });
  await app.listen();
};
