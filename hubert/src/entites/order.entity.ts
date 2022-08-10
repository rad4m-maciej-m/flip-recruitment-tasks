import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderRow } from './orderRow.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column()
  externalId: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @OneToMany(() => OrderRow, (orderRow) => orderRow.order)
  rows: OrderRow[];

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;
}
