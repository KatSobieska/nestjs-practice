import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { CreateDateColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderedProducts } from '../db/orderedProducts.entity';

export class CreateOrderDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  description: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @OneToOne((type) => UserAddress, (address) => address.user)
  address: UserAddress[];
  @IsNotEmpty()
  orderItems: OrderedProducts[];
}
