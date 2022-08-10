import { Customer } from 'src/Model/customer.enity';
import { Item } from 'src/Model/item.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;
}
