import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { CreateDateColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class UpdateOrderDTO {
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
  address: UserAddress;
}
