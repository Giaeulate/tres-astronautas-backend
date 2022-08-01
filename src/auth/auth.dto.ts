import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ type: String, required: true, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo email' })
  @IsEmail({message: 'El valor en el campo email es incorrecto'})
  email: string;

  @ApiProperty({ type: String, required: true, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo password' })
  password: string;
}

export class RegisterAuthDto {
  // @ApiProperty({ type: String, required: true, default: '' })
  // @IsNotEmpty({ message: 'Debe agregar el campo token' })
  // token: string;

  @ApiProperty({ type: String, required: true, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo email' })
  @IsEmail({message: 'El valor en el campo email es incorrecto'})
  email: string;

  @ApiProperty({ type: String, required: true, default: '' })
  @IsNotEmpty({ message: 'Debe agregar el campo password' })
  @MaxLength(18, {message: 'Password debe contener menos de 18 caracteres'})
  @MinLength(4, {message: 'Password debe contener al menos 4 caracteres'})
  password: string;
}
