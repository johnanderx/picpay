import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/prisma.service';
import { User } from '../interfaces/user.interface';
import { encrypt } from '../utils/crypto';
@Injectable()
export class RegisterRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(user: User) {
    const encryptedPassword = await encrypt(user.password);

    return await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: encryptedPassword,
        cpf: user.cpf,
        cnpj: user.cnpj,
        type: user.userType,
      },
    });
  }
}
