import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Item, Order, OrderRow } from 'src/entites';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'user',
      password: '1qazxsW@',
      database: 'top-order',
      entities: [Customer, Item, Order, OrderRow],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer, Item, Order, OrderRow]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
