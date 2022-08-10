import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Item, Order, OrderRow } from 'src/entites';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

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
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
