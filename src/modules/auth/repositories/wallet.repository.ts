import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class WalletRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createWallet(userId: string) {
    return await this.prismaService.wallet.create({ data: { userId: userId } });
  }
}
