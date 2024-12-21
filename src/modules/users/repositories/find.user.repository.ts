import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/services/prisma.service';
@Injectable()
export class FindUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(id: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async findUserByCpf(cpf: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          cpf,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async findUserByCnpj(cnpj: string) {
    if (!cnpj) {
      return;
    }
    try {
      return await this.prismaService.user.findUnique({
        where: {
          cnpj,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }
}
