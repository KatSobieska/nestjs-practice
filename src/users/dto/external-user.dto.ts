import { Role } from '../db/roles.entity';

export interface ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: Array<ExternalUserAddressDTO>;
  role: Role[];
}

export interface ExternalUserAddressDTO {
  country: string;
  city: string;
  street: string;
  number: number;
}
