import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entites';
import { Repository } from 'typeorm';
import { getQuery } from './getQuery';

type QueryType = 'profitable' | 'oftenBought' | 'oftenBoughtYesterday';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Item) private itemsRepo: Repository<Item>) {}

  async getTopProducts(limit: number, queryType: QueryType) {
    if (typeof limit !== 'number') {
      limit = 10;
    }

    // Max 100
    limit = Math.min(Math.max(Math.round(limit), 0), 100);

    const result: Array<{
      externalId: string;
      sum: number;
    }> = await this.itemsRepo.query(getQuery(limit, queryType));

    return result;
  }
}
