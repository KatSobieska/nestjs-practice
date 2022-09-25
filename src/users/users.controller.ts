import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  getUserById(@Param('id') _id_: string): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Get()
  getAllUsers(): Array<ExternalUserDTO> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Post()
  addUser(@Body() _item_: CreateUserDTO): ExternalUserDTO {
    return this.userRepository.addUser(_item_);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id') _id_: string,
    @Body() dto: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(_id_, dto));
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return { ...user, dateOfBirth: dateToArray(user.dateOfBirth) };
  }
}
