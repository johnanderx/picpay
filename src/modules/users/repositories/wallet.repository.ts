import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/prisma.service';

@Injectable()
export class WalletRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createWallet(userId: string) {
    try {
      return await this.prismaService.wallet.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
