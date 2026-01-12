import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly author?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsEnum(Category)
  readonly category?: Category;
}
