import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repProducts: Repository<Product>,
  ) {}

  async getProfitableProducts() {
    return await this.repProducts.query(`
      SELECT product.id, SUM(item.quantity * product.price) AS "result"
      FROM item
      INNER JOIN product ON product.id = item."productId"
      GROUP BY product.id
      ORDER BY "result" DESC
      LIMIT 10
    `);
  }

  async getTopBoughtProducts() {
    return await this.repProducts.query(`
      SELECT product.id, COUNT(item.id) AS "count"
      FROM item
      INNER JOIN product ON product.id = item."productId"
      GROUP BY product.id
      ORDER BY "count" DESC
      LIMIT 10
    `);
  }

  async getTopMostOftenBoughtFromYesterday() {
    return await this.repProducts.query(`
      SELECT product.id, COUNT(item.id) AS "count"
      FROM item
      INNER JOIN "order" ON "order".id = item."orderId"
      INNER JOIN product ON product.id = item."productId"
      WHERE "order".date >= (current_date - INTEGER '1')
      GROUP BY product.id
      ORDER BY "count" DESC
      LIMIT 10
    `);
  }
}
