import { Roles } from 'src/shared/enums/roles.enum';
import { TextFilterType } from 'src/shared/enums/testFilterType.enum';

export interface UsersQuery {
  firstName?: string;
  lastName?: string;
  email?: string;
  nameFilterType?: TextFilterType;
  dateOfBirthLaterThan?: string;
  dateOfBirthEarlierThan?: string;
  sortField?: string;
  role?: Roles[];
}
