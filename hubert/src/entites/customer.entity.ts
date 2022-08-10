import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column()
  externalId: string;

  @Column({
    length: 255,
  })
  name: string;

  @OneToMany(() => Order, (order) => order.customer)
  order: Order[];
}
