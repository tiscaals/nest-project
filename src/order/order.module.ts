import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_detail, orders } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([orders, order_detail])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
