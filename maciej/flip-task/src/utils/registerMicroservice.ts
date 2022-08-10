import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from './config';

type MicroserviceNames = keyof ReturnType<typeof config>['port']['service'];

export const registerMicroservice = (name: MicroserviceNames) => {
  return ClientsModule.register([
    {
      name: `${name.toUpperCase()}_SERVICE`,
      transport: Transport.TCP,
      options: {
        port: config().port.service[name],
      },
    },
  ]);
};
