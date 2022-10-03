import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { CreateDateColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderedProducts } from '../db/orderedProducts.entity';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsNotEmpty()
  orderItems: Array<CreateOrderProductDTO>;
  @IsNotEmpty()
  @IsUUID()
  userAddressId: string;
}

export class CreateOrderProductDTO {
  @IsNotEmpty()
  productId: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
