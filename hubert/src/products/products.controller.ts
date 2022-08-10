import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern({ cmd: 'products.top.profitable' })
  async getTopProfitable(limit: number) {
    return await this.productsService.getTopProducts(limit, 'profitable');
  }

  @MessagePattern({ cmd: 'products.top.most.often.bought' })
  async getTopMostOftenBought(limit: number) {
    return await this.productsService.getTopProducts(limit, 'oftenBought');
  }

  @MessagePattern({ cmd: 'products.top.most.often.bought.yesterday' })
  async getTopMostOftenBoughtYesterday(limit: number) {
    return await this.productsService.getTopProducts(
      limit,
      'oftenBoughtYesterday',
    );
  }
}
