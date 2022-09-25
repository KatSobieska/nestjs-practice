import { Roles } from 'src/enums/roles.enum';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address: Array<CreateUserAddress>;
  role: Array<Roles>;
}

export interface CreateUserAddress {
  country: string;
  city: string;
  street: string;
  homeNo: string;
  flatNo?: string;
}
