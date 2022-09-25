import { Roles } from 'src/shared/enums/roles.enum';

export interface ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: Array<ExternalUserAddressDTO>;
  role: Roles;
}

export interface ExternalUserAddressDTO {
  country: string;
  city: string;
  street: string;
  homeNo: string;
  flatNo?: string;
}
