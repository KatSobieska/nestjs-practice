import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'user_addresses' })
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  country: string;
  @Column({ length: 100 })
  city: string;
  @Column({ length: 100 })
  street: string;
  @Column({ default: 0 })
  number: number;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
