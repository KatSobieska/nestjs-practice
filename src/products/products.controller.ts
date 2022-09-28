import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { Product } from './db/products.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(_id_),
    );
  }

  @Get() async getAllProducts(): Promise<ExternalProductDTO[]> {
    const allProducts = await this.productRepository.getAllProducts();
    return allProducts.map((product) => this.mapProductToExternal(product));
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDTO> {
    const product = await this.productRepository.addProduct(item);
    return this.mapProductToExternal(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') _id_: string): Promise<void> {
    await this.productRepository.deleteProduct(_id_);
    return null;
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() dto: UpdateProductDTO,
  ): Promise<ExternalProductDTO> {
    const product = await this.productRepository.updateProduct(_id_, dto);
    return this.mapProductToExternal(product);
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }
}
