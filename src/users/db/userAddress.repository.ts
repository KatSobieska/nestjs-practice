import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }
  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        id: userId,
      },
    });

    this.remove(usersAddresses);
  }
  async findAllAddresses(): Promise<UserAddress[]> {
    return await this.find();
  }
}
