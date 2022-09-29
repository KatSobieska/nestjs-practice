import { Roles } from 'src/shared/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entity } from 'typeorm';
import { Role } from './roles.entity';
import { UserAddress } from './userAddress.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 50, default: 0 })
  firstName: string;
  @Column({ length: 50, default: 0 })
  lastName: string;
  @Column({ length: 50, default: 0 })
  email: string;
  @CreateDateColumn({ type: 'timestamp' })
  dateOfBirth: Date;
  @OneToMany((type) => UserAddress, (address) => address.user)
  address?: UserAddress[];
  @Column('enum', {
    enum: Roles,
  })
  role: Role[];
}
