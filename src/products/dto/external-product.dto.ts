import { Tags } from 'src/shared/enums/tags.enum';

export interface ExternalProductDTO {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tags;
  createdAt: Array<number>;
  updatedAt: Array<number>;
}
