import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '~/entites';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Item) private itemsRepo: Repository<Item>) {}

  async getTopProfitableProducts(count: number) {
    if (typeof count !== 'number') {
      count = 10;
    }

    count = Math.min(Math.max(Math.round(count), 0), 100);

    const result = (await this.itemsRepo.query(`
      SELECT item."refId", SUM(order_row.quantity * item.price) AS "priceSum"
      FROM order_row
      INNER JOIN item ON item.id = order_row."itemId"
      GROUP BY item.id
      ORDER BY "priceSum" DESC
      LIMIT ${count}
    `)) as Array<{
      refId: string;
      priceSum: number;
    }>;

    return result;
  }

  async getTopMostOftenBoughtProducts(count: number) {
    if (typeof count !== 'number') {
      count = 10;
    }

    count = Math.min(Math.max(Math.round(count), 0), 100);

    const result = (await this.itemsRepo.query(`
      SELECT item."refId", COUNT(order_row.id) AS "itemsCount"
      FROM order_row
      INNER JOIN item ON item.id = order_row."itemId"
      GROUP BY item.id
      ORDER BY "itemsCount" DESC
      LIMIT ${count}
    `)) as Array<{
      refId: string;
      itemsCount: number;
    }>;

    return result;
  }

  async getTopMostOftenBoughtProductsFromYesterday(count: number) {
    if (typeof count !== 'number') {
      count = 10;
    }

    count = Math.min(Math.max(Math.round(count), 0), 100);

    const result = (await this.itemsRepo.query(`
      SELECT item.id, COUNT(order_row.id) AS "itemsCount"
      FROM order_row
      INNER JOIN "order" ON "order".id = order_row."orderId"
      INNER JOIN item ON item.id = order_row."itemId"
      WHERE "order".date >= (current_date - INTEGER '1')
      GROUP BY item.id
      ORDER BY "itemsCount" DESC
      LIMIT ${count}
    `)) as Array<{
      refId: string;
      itemsCount: number;
    }>;

    return result;
  }
}
