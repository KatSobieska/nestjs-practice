import { Injectable } from '@nestjs/common';
import { Repository, In, DataSource } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
  findProductsByName(names: string[]): Promise<Product[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
