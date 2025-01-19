import { UserType } from '@prisma/client';

export interface User {
  userType: UserType;
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  cnpj?: string;
}
