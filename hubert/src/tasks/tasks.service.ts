import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Customer, Item, Order, OrderRow } from 'src/entites';
import { InjectRepository } from '@nestjs/typeorm';
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
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
    @InjectRepository(Item) private itemsRepo: Repository<Item>,
    @InjectRepository(OrderRow) private orderRowsRepo: Repository<OrderRow>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateDatabase(count = 1000) {
    const LIMIT = 1500;

    main: for (let page = 1; page < 1000; page++) {
      console.log('Updating page -', page);

      if (count < page) {
        return console.log('Finished');
      }

      const res = await fetch(
        `https://recruitment-api.dev.flipfit.io/orders?_page=${page}&_limit=${LIMIT}`,
      );

      const data: ExternalOrder[] = await res.json();

      const latestOrder = await this.ordersRepo.findOne({
        where: {
          externalId: Not(''),
        },
        select: ['date'],
        order: {
          date: 'DESC',
        },
      });

      const latestOrderDate = latestOrder?.date;

      if (data.length === 0) {
        break;
      }

      for (const entry of data) {
        if (
          latestOrderDate &&
          new Date(entry.date).getTime() <= latestOrderDate.getTime()
        ) {
          break main;
        }

        const newOrder = new Order();
        newOrder.externalId = entry.id;
        newOrder.date = new Date(entry.date);
        newOrder.rows = [];

        const foundCustomer = await this.customersRepo.findOneBy({
          externalId: entry.customer.id,
        });

        if (!foundCustomer) {
          const customer = new Customer();
          customer.externalId = entry.customer.id;
          customer.name = entry.customer.name;
          await this.customersRepo.insert(customer);
          newOrder.customer = customer;
        } else {
          newOrder.customer = foundCustomer;
        }

        await this.ordersRepo.insert(newOrder);

        for (const item of entry.items) {
          const newOrderRow = new OrderRow();

          const foundItem = await this.itemsRepo.findOneBy({
            externalId: item.product.id,
          });

          let newItem = foundItem as Item;

          if (!foundItem) {
            newItem = new Item();
            newItem.externalId = item.product.id;
            newItem.name = item.product.name;
            newItem.price = parseFloat(item.product.price);
            await this.itemsRepo.insert(newItem);
          }

          newOrderRow.item = foundItem || newItem;
          newOrderRow.quantity = item.quantity;
          newOrder.rows.push(newOrderRow);
          await this.orderRowsRepo.insert(newOrderRow);
        }

        await this.ordersRepo.save(newOrder);
      }
    }

    console.log('Finished');
  }
}
