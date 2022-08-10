import { registerDatabase } from '~/utils';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Customer, Item, Order, OrderRow } from '~/entites';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    registerDatabase([Order, Customer, Item, OrderRow]),
    TypeOrmModule.forFeature([Order, Customer, Item, OrderRow]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
