import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/Model/customer.enity';
import { Item } from 'src/Model/item.entity';
import { Order } from 'src/Model/order.entity';
import { Db } from 'src/Stores/Db';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...Db,
      entities: [Customer, Order, Item, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer, Order, Item, Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
