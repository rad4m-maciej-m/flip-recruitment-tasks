import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { Order } from './order.entity';

@Entity()
export class OrderRow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.id)
  item: Item;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.rows)
  order: Order;
}
