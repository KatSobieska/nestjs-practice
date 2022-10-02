import { Product } from 'src/products/db/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './orders.entity';

@Entity({
  name: 'orders',
})
export class OrderedProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => Order, (orderId) => orderId.id, { onDelete: 'CASCADE' })
  orderId: Order;
  @ManyToOne((type) => Product, (productId) => productId.id, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'float', default: 0 })
  quantity: number;

  @Column({ type: 'float', default: 0 })
  amount: number;
}
