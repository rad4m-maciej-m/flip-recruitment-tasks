import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/Model/customer.enity';
import { Item } from 'src/Model/item.entity';
import { Order } from 'src/Model/order.entity';
import { Product } from 'src/Products/product.entity';
import { Not, Repository } from 'typeorm';

type ExternalOrder = {
  id: string;
  date: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: string;
    };
    quantity: number;
  }>;
  customer: {
    id: string;
    name: string;
  };
};

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Item) private repItems: Repository<Item>,
    @InjectRepository(Customer) private repCustomers: Repository<Customer>,
    @InjectRepository(Product) private repProducts: Repository<Product>,
    @InjectRepository(Order) private repOrders: Repository<Order>,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async updateDb(count = 2000) {
    const limit = 1000;

    main: for (let currentPage = 1; currentPage < 1_000; currentPage++) {
      if (count < currentPage) {
        return;
      }

      const response = await fetch(
        `https://recruitment-api.dev.flipfit.io/orders?_page=${currentPage}&_limit=${limit}`,
      );
      const entries = (await response.json()) as ExternalOrder[];

      if (entries.length === 0) {
        break;
      }

      const lastOrder = await this.repOrders.findOne({
        where: {
          id: Not(''),
        },
        select: ['date'],
        order: {
          date: 'DESC',
        },
      });

      const latestOrderDate = lastOrder?.date;

      for (const entry of entries) {
        if (
          latestOrderDate &&
          new Date(entry.date).getTime() <= latestOrderDate.getTime()
        ) {
          break main;
        }

        const newOrder = new Order();
        newOrder.id = entry.id;
        newOrder.date = new Date(entry.date);
        newOrder.items = [];

        const customer = await this.repCustomers.findOneBy({
          id: entry.customer.id,
        });

        if (!customer) {
          const customer = new Customer();
          customer.id = entry.customer.id;
          customer.name = entry.customer.name;
          newOrder.customer = customer;
          await this.repCustomers.insert(customer);
        } else {
          newOrder.customer = customer;
        }

        await this.repOrders.insert(newOrder);

        for (const element of entry.items) {
          const newItem = new Item();

          const product = await this.repProducts.findOneBy({
            id: element.product.id,
          });

          let newProduct: Product = product as unknown as Product;

          if (!product) {
            newProduct = new Product();
            newProduct.id = element.product.id;
            newProduct.name = element.product.name;
            newProduct.price = parseFloat(element.product.price);
            await this.repProducts.insert(newProduct);
          }

          newItem.product = product || newProduct;
          newItem.quantity = element.quantity;
          newOrder.items.push(newItem);
          await this.repItems.insert(newItem);
        }

        await this.repOrders.save(newOrder);
      }
    }
  }
}
