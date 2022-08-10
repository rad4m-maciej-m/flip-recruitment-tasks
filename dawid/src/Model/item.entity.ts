import { Order } from 'src/Model/order.entity';
import { Product } from 'src/Products/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.items)
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
