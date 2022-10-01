import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/product.repository';
import { Tag } from './db/tags.entity';
import { Product } from './db/products.entity';
import { UpdateProductDTO } from './dto/update-product.dto';

import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private connection: Connection,
  ) {}
  private products: Array<Product> = [];

  async addProduct(item: CreateProductDTO): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await this.tagRepository.findAllTags();
      const productToSave = new Product();

      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.count = item.count;
      productToSave.tags = tags;

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToSave);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDTO): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
      const productToUpdate = await this.getProductById(id);

      productToUpdate.name = item.name;
      productToUpdate.price = item.price;
      productToUpdate.count = item.count;
      productToUpdate.tags = tags;

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToUpdate);
    });
  }

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
