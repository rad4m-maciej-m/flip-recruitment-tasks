import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Customer, Item, Order, OrderRow } from '~/entites';
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

  @Cron(CronExpression.EVERY_10_HOURS)
  async updateDatabase(count = Infinity) {
    const limit = 1000;

    main: for (let currentPage = 1; currentPage < 1_000; currentPage++) {
      console.log(`--- PAGE ${currentPage} ---`);

      if (count < currentPage) {
        console.log('Done!');
        return;
      }

      const res = await fetch(
        `https://recruitment-api.dev.flipfit.io/orders?_page=${currentPage}&_limit=${limit}`,
      );
      const entries = (await res.json()) as ExternalOrder[];

      const latestOrder = await this.ordersRepo.findOne({
        where: {
          refId: Not(''),
        },
        select: ['date'],
        order: {
          date: 'DESC',
        },
      });
      const latestOrderDate = latestOrder?.date;

      if (entries.length === 0) {
        break;
      }

      for (const entry of entries) {
        if (
          latestOrderDate &&
          new Date(entry.date).getTime() <= latestOrderDate.getTime()
        ) {
          break main;
        }

        const newOrder = new Order();
        newOrder.refId = entry.id;
        newOrder.date = new Date(entry.date);
        newOrder.rows = [];

        const foundCustomer = await this.customersRepo.findOneBy({
          refId: entry.customer.id,
        });

        if (!foundCustomer) {
          const customer = new Customer();
          customer.refId = entry.customer.id;
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
            refId: item.product.id,
          });

          let newItem: Item = foundItem as unknown as Item;

          if (!foundItem) {
            newItem = new Item();
            newItem.refId = item.product.id;
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

    console.log('Done!');
  }
}
