import { IsInt, IsISBN, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString() @MinLength(1) @MaxLength(200) title!: string;
  @IsString() @MinLength(1) @MaxLength(150) author!: string;
  @IsString() @IsISBN() isbn!: string;
  @IsInt() @Min(1) totalCopies!: number;
  @IsInt() @Min(1) genreId!: number;
}
