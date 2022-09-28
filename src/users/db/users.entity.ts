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
  @Column({ length: 50 })
  firstName: string;
  @Column({ length: 50 })
  lastName: string;
  @Column({ length: 50 })
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
