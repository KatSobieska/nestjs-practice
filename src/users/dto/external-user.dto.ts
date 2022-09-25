import { Roles } from 'src/enums/roles.enum';

export interface ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address: Array<ExternalUserAddress>;
  role: Array<Roles>;
}

export interface ExternalUserAddress {
  country: string;
  city: string;
  street: string;
  homeNo: string;
  flatNo?: string;
}
