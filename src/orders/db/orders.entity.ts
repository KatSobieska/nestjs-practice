import { UserAddress } from 'src/users/db/userAddress.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderedProducts } from './orderedProducts.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(
    (type) => OrderedProducts,
    (orderedProducts) => orderedProducts.orderId,
  )
  orderItems: OrderedProducts[];
  address: UserAddress[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
