import { UserType } from '@prisma/client';

export interface User {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cnpj?: string;
  userType: UserType;
}
