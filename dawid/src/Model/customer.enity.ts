import { Order } from 'src/Model/order.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.customer)
  order: Order[];
}
