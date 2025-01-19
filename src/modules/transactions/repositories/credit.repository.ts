import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class CreditRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async insertCredit(walletId: string, value: number) {
    const decimalValue = new Decimal(value);
    return await this.prismaService.wallet.update({
      where: { id: walletId },
      data: {
        balance: {
          increment: decimalValue,
        },
      },
    });
  }
}
