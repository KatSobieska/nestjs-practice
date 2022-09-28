import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataService } from './users-data.service';
import { UserValidatorService } from './user-validator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/users.entity';
import { UserAddress } from './db/userAddress.entity';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserAddress]),
  ],
  controllers: [UsersController],
  providers: [
    UsersDataService,
    UserValidatorService,
    UserRepository,
    UserAddressRepository,
  ],
})
export class UsersModule {}
