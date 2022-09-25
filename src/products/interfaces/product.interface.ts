import { Tags } from 'src/shared/enums/tags.enum';

export interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tags;
  createdAt: Date;
  updatedAt: Date;
}
