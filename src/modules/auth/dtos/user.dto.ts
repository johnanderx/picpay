import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  userType: UserType;

  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  fullName: string;

  @IsEmail(
    { require_tld: true },
    { message: 'O formato do e-mail é inválido.' },
  )
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve conter, no mínimo, 8 caracteres.' })
  password: string;

  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'O formato do CPF é inválido.',
  })
  cpf: string;

  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'O formato do CNPJ é inválido.',
  })
  cnpj?: string;
}
