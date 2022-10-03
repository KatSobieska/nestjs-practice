import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Product } from 'src/products/db/products.entity';
import { Orders } from 'src/shared/enums/orders.enum';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { OrderedProducts } from '../db/orderedProducts.entity';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsNotEmpty()
  orderItems: Array<UpdateOrderProductDTO>;
  @IsNotEmpty()
  @IsUUID()
  userAddressId: string;
  @IsNotEmpty()
  orders: Orders[];
}
export class UpdateOrderProductDTO {
  @IsNotEmpty()
  productId: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
