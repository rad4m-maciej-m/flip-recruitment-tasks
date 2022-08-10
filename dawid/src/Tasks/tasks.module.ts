import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/Model/customer.enity';
import { Item } from 'src/Model/item.entity';
import { Order } from 'src/Model/order.entity';
import { Product } from 'src/Products/product.entity';
import { Db } from 'src/Stores/Db';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.services';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Customer, Order, Item, Product],
      synchronize: true,
      ...Db,
    }),
    TypeOrmModule.forFeature([Customer, Order, Item, Product]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
