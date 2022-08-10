import { registerDatabase, registerMicroservice } from '~/utils';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    registerDatabase(),
    registerMicroservice('tasks'),
    registerMicroservice('products'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
