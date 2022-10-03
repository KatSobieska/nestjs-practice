import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

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
