import { UserAddress } from 'src/users/db/userAddress.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(
    (type) => OrderedProducts,
    (orderedProducts) => orderedProducts.orderId,
  )
  @JoinTable({
    name: 'orderedProducts',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'productId',
    },
  })
  orderItems: OrderedProducts[];

  @JoinTable({
    name: 'orderedAddresses',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'addressId',
    },
  })
  address: UserAddress[];
}
