import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortPath } from './Utils/port';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: PortPath.tasks,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: PortPath.products,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
