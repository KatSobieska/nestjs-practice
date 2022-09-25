import { Roles } from 'src/enums/roles.enum';

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address: Array<UpdateUserAddress>;
  role: Array<Roles>;
}

export interface UpdateUserAddress {
  country: string;
  city: string;
  street: string;
  homeNo: string;
  flatNo?: string;
}
