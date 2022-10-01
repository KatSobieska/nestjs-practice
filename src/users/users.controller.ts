import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './db/users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { UsersDataService } from './users-data.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  emailValidate = new UserValidatorService(this.userRepository);

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.getUserById(_id_));
  }

  @Get()
  async getAllUsers(): Promise<ExternalUserDTO[]> {
    const allUsers = await this.userRepository.getAllUsers();
    return allUsers.map((user) => this.mapUserToExternal(user));
  }

  @Post()
  async addUser(@Body() _item_: CreateUserDTO): Promise<ExternalUserDTO> {
    await this.emailValidate.validateUniqueEmail(_item_.email);
    const user = await this.userRepository.addUser(_item_);
    return this.mapUserToExternal(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') _id_: string): Promise<void> {
    await this.userRepository.deleteUser(_id_);
    return null;
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDTO,
  ): Promise<ExternalUserDTO> {
    const user = await this.userRepository.updateUser(id, dto);
    return this.mapUserToExternal(user);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return { ...user };
  }
}
