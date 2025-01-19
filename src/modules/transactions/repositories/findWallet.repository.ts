import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
@Injectable()
export class FindWalletRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findWalletById(walletId: string) {
    return await this.prismaService.wallet.findUnique({
      where: { id: walletId },
    });
  }
}
