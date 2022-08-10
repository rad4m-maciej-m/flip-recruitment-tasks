import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern({ cmd: 'products.profitable' })
  async getTopProfitable() {
    return await this.productsService.getProfitableProducts();
  }

  @MessagePattern({ cmd: 'products.often.bought' })
  async getTopMostOftenBought() {
    return await this.productsService.getTopBoughtProducts();
  }

  @MessagePattern({ cmd: 'products.often.bought.from.yesterday' })
  async getTopMostOftenBoughtFromYesterday() {
    return await this.productsService.getTopMostOftenBoughtFromYesterday();
  }
}
