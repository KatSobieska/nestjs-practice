import { Role } from '../db/roles.entity';
import { UserAddress } from '../db/userAddress.entity';

export interface ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: UserAddress[];
  role: Role[];
}

export interface ExternalUserAddressDTO {
  country: string;
  city: string;
  street: string;
  number: number;
}
