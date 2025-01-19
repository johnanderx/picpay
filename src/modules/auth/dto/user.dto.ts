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
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  fullName: string;

  @IsEmail({ require_tld: true }, { message: 'Foramto do E-mail inválido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres.' })
  password: string;

  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'Formato do CPF inválido.',
  })
  cpf: string;

  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'Formato do CNPJ inválido.',
  })
  cnpj?: string;
}
