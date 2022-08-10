import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TASKS_SERVICE') private tasksClient: ClientProxy,
    @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
  ) {}

  @Get('products/profitable')
  async getProfitable(@Res() res: Response) {
    const data = await firstValueFrom(
      this.productsClient.send(
        {
          cmd: 'products.profitable',
        },
        10,
      ),
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get('products/most-often-bought')
  async getTopBoughtProducts(@Res() res: Response) {
    const data = await firstValueFrom(
      this.productsClient.send(
        {
          cmd: 'products.often.bought',
        },
        10,
      ),
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get('products/most-often-bought/from-yesterday')
  async getTopBoughtProductsYesterday(@Res() res: Response) {
    const data = await firstValueFrom(
      this.productsClient.send(
        {
          cmd: 'products.often.bought.from.yesterday',
        },
        10,
      ),
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get('update')
  fetchData() {
    this.tasksClient.emit('update', {});
    return 'Updating';
  }
}
