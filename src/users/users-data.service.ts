import { Injectable } from '@nestjs/common';
import { CreateUserAddressDTO, CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserAddressDTO, UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { UserAddress } from './db/userAddress.entity';
import { User } from './db/users.entity';
import { Connection, EntityManager } from 'typeorm';
import { UsersQuery } from './queries/UsersQuery.interface';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private connection: Connection,
  ) {}
  private users: Array<User> = [];

  async addUser(user: CreateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.firstName = user.firstName;
      userToSave.lastName = user.lastName;
      userToSave.email = user.email;
      userToSave.role = user.role;
      userToSave.dateOfBirth = user.dateOfBirth;

      userToSave.address = await this.prepareUserAddressesToSave(user.address);

      return this.userRepository.save(userToSave);
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToUpdate = await this.getUserById(id);

      userToUpdate.firstName = user.firstName;
      userToUpdate.lastName = user.lastName;
      userToUpdate.email = user.email;
      userToUpdate.role = user.role;
      userToUpdate.dateOfBirth = user.dateOfBirth;

      userToUpdate.address = await this.prepareUserAddressesToSave(
        user.address,
      );

      return this.userRepository.save(userToUpdate);
    });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getAllUsers(_query_: UsersQuery): Promise<User[]> {
    return this.userRepository.findAll(_query_);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
