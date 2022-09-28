import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Tags } from 'src/shared/enums/tags.enum';

export class UpdateProductDTO {
  @IsNotEmpty() @MinLength(0) @MaxLength(25) name: string;
  @IsNotEmpty() @IsNumber() @Min(0) price: number;
  @IsNotEmpty() @IsNumber() @Min(0) count: number;
  @IsArray()
  @IsEnum({ each: true })
  tags: Tags[];
}
