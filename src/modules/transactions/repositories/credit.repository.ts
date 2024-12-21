import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/services/prisma.service';
@Injectable()
export class CreditRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addCredit(id, value: number) {
    try {
      return await this.prismaService.wallet.update({
        where: { id },
        data: { balance: { increment: value } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
