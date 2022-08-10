import { Item } from 'src/Model/item.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Item, (item) => item.product)
  items: Item[];
}
