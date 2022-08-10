import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern({ cmd: 'products.top.profitable' })
  async getTopProfitable(count: number) {
    return await this.productsService.getTopProfitableProducts(count);
  }

  @MessagePattern({ cmd: 'products.top.most.often.bought' })
  async getTopMostOftenBought(count: number) {
    return await this.productsService.getTopMostOftenBoughtProducts(count);
  }

  @MessagePattern({ cmd: 'products.top.most.often.bought.from.yesterday' })
  async getTopMostOftenBoughtFromYesterday(count: number) {
    return await this.productsService.getTopMostOftenBoughtProductsFromYesterday(
      count,
    );
  }
}
