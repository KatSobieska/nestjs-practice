import { Transform, Type } from 'class-transformer';
import { arrayToDate } from '../../shared/helpers/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Role } from '../db/roles.entity';
import { Roles } from '../../shared/enums/roles.enum';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => arrayToDate(value))
  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDTO)
  address?: Array<CreateUserAddressDTO>;

  @IsEnum(Roles)
  role: Role[];
}

export class CreateUserAddressDTO {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
