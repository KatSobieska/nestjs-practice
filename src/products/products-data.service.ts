import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { ExternalProductDTO } from './dto/external-product.dto';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(_item_: CreateProductDTO): ExternalProductDTO {
    const product: Product = {
      ..._item_,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((i) => i.id !== id);
  }

  updateProduct(id: string, dto: CreateProductDTO): Product {
    this.products = this.products.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: new Date(),
        };
      }

      return i;
    });
    return this.getProductById(id);
  }

  getProductById(id: string): Product {
    return this.products.find((i) => i.id === id);
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
