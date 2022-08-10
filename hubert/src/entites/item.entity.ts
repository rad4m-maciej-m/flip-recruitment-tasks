import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderRow } from './orderRow.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column()
  externalId: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToMany(() => OrderRow, (orderRow) => orderRow.item)
  orderRows: OrderRow[];
}
