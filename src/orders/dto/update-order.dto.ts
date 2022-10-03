import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Orders } from 'src/shared/enums/orders.enum';

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
