import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item, Order, OrderRow, Customer } from '~/entites';
import { registerDatabase } from '~/utils';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    registerDatabase([Item, OrderRow, Order, Customer]),
    TypeOrmModule.forFeature([Item, OrderRow, Order, Customer]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
