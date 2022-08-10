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

  async onApplicationBootstrap() {
    await this.tasksClient.connect();
  }

  @Get('fetch')
  fetchData() {
    this.tasksClient.emit('fetch-data', 1);
    return 'Fetching';
  }

  @Get('products/top/profitable')
  async getTopProfitable(@Res() res: Response) {
    const data = await firstValueFrom(
      this.productsClient.send({ cmd: 'products.top.profitable' }, 10),
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get('products/top/most-often-bought')
  async getTopMostOftenBought(@Res() res: Response) {
    const data = await firstValueFrom(
      this.productsClient.send({ cmd: 'products.top.most.often.bought' }, 10),
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get('products/top/most-often-bought/from-yesterday')
  async getTopMostOftenBoughtFromYesterday(@Res() res: Response) {
    const data = await firstValueFrom(
      this.productsClient.send(
        { cmd: 'products.top.most.often.bought.from.yesterday' },
        10,
      ),
    );

    res.status(HttpStatus.OK).json(data);
  }
}
