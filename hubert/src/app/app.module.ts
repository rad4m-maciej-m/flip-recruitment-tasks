import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ports } from 'src/constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'user',
      password: '1qazxsW@',
      database: 'top-order',
      entities: [],
      synchronize: true,
    }),
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: Ports.tasks,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: Ports.products,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
