import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(_item_: CreateUserDTO): ExternalUserDTO {
    const checkEmail = this.getUserByEmail(_item_.email);
    if (checkEmail) {
      throw new UserRequireUniqueEmailException();
    }
    const user: User = {
      ..._item_,
      id: uuidv4(),
      dateOfBirth: new Date(),
    };
    this.users.push(user);
    return {
      ...user,
      dateOfBirth: user.dateOfBirth,
    };
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUser(id: string, dto: UpdateUserDTO): User {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...dto,
          id: user.id,
          dateOfBirth: user.dateOfBirth,
        };
      }

      return user;
    });
    return this.getUserById(id);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }

  getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }
}
