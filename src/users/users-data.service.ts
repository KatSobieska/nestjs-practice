import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { dateToArray } from 'src/shared/helpers/date.helper';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(_item_: CreateUserDTO): ExternalUserDTO {
    const user: User = {
      ..._item_,
      id: uuidv4(),
      dateOfBirth: new Date(),
    };
    this.users.push(user);
    return {
      ...user,
      dateOfBirth: dateToArray(user.dateOfBirth),
    };
  }
  deleteUser(id: string): void {
    this.users = this.users.filter((i) => i.id !== id);
  }

  updateUser(id: string, dto: CreateUserDTO): User {
    this.users = this.users.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          dateOfBirth: i.dateOfBirth,
        };
      }

      return i;
    });
    return this.getUserById(id);
  }

  getUserById(id: string): User {
    return this.users.find((i) => i.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
