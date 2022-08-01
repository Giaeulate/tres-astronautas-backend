import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { ApiFile } from 'src/shared/file.decorator';

export class ProductDto {
  @ApiProperty({ type: String, required: true, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo name' })
  name: string;

  @ApiProperty({ type: Number, required: true, default: 0 })
  @IsNotEmpty({ message: 'Debe agregar el campo price' })
  @IsNumber()
  @Min(0.1, { message: 'El precio debe ser mayor a 0' })
  @Type(() => Number)
  price: Number;

  @ApiProperty({ type: Date, default: '', required: false, nullable: true })
  @IsOptional()
  expired_date: Date;

  // @ApiFile()
  // @ApiProperty({ required: false, nullable: true })
  // @IsOptional()
  // file: any;
}
