import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo document_number' })
  document_number: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo name' })
  name: string;

  @ApiProperty({ type: String, default: '' })
  last_name: string;

  @ApiProperty({ type: Date, default: '' })
  @IsDateString({ message: 'Debe agregar una fecha válida' })
  birthdate: Date;

  // @ApiProperty({ type: Date, default: "" })
  // image: string;
}
