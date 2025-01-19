import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class FindUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUserById(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  public async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  public async findUserByCpf(cpf: string) {
    return await this.prismaService.user.findUnique({ where: { cpf } });
  }

  public async findUserByCnpj(cnpj: string | null) {
    if (cnpj) {
      return await this.prismaService.user.findUnique({ where: { cnpj } });
    }
    return null;
  }
}
