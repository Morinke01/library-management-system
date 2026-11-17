import { IsInt, IsISBN, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(200) title?: string;
  @IsOptional() @IsString() @MinLength(1) @MaxLength(150) author?: string;
  @IsOptional() @IsString() @IsISBN() isbn?: string;
  @IsOptional() @IsInt() @Min(1) totalCopies?: number;
  @IsOptional() @IsInt() @Min(1) genreId?: number;
}
