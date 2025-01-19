import { UserType } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail(
    { require_tld: true },
    { message: 'O formato do e-mail é inválido.' },
  )
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;
}
