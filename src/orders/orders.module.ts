import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './db/orders.entity';
import { OrderRepository } from './db/order.repository';
import { OrderedProducts } from './db/orderedProducts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderedProducts]),
  ],
  controllers: [OrdersController],
  providers: [OrdersDataService, OrderRepository],
})
export class OrdersModule {}
