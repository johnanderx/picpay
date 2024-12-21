import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsEmail({ require_tld: true }, { message: 'Não é um email válido.' })
  email: string;

  @MinLength(8, { message: 'A senha deve conter no mínimo 8 caracteres.' })
  password: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'Formato do cpf inválido.',
  })
  cpf: string;

  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'Formato do cnpj inválido.',
  })
  cnpj: string;

  userType: UserType;
}
