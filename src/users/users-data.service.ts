import { Injectable } from '@nestjs/common';
import { CreateUserAddressDTO, CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserAddressDTO, UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { UserAddress } from './db/userAddress.entity';
import { User } from './db/users.entity';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}
  private users: Array<User> = [];

  async addUser(_item_: CreateUserDTO): Promise<User> {
    const userToSave = new User();
    userToSave.id = uuidv4();
    userToSave.firstName = _item_.firstName;
    userToSave.lastName = _item_.lastName;
    userToSave.email = _item_.email;
    userToSave.dateOfBirth = _item_.dateOfBirth;
    userToSave.role = _item_.role;
    userToSave.address = await this.prepareUserAddressesToSave(_item_.address);

    return this.userRepository.save(userToSave);
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async updateUser(id: string, item: UpdateUserDTO): Promise<User> {
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = item.firstName;
    userToUpdate.lastName = item.lastName;
    userToUpdate.email = item.email;
    userToUpdate.dateOfBirth = item.dateOfBirth;
    userToUpdate.address = await this.prepareUserAddressesToSave(item.address);
    userToUpdate.role = item.role;

    await this.userAddressRepository.deleteUserAddressesByUserId(id);
    await this.userRepository.save(userToUpdate);

    return this.getUserById(id);
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
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
