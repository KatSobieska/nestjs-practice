import { TextFilterType } from 'src/shared/enums/textFilterType.enum';

export interface ProductsQuery {
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  nameFilterType?: TextFilterType;
  minCount?: number;
  maxCount?: number;
  sortField?: string;
  orderDirection?: 'DESC' | 'ASC';
}
