import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
@Injectable()
export class TransfersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async transfer(
    payerWalletId: string,
    payeeWalletId: string,
    value: number,
  ) {
    const decimalValue = new Decimal(value);

    const updatePayerWallet = await this.prismaService.wallet.update({
      where: { id: payerWalletId },
      data: {
        balance: {
          decrement: decimalValue,
        },
      },
    });

    const updatePayeeWallet = await this.prismaService.wallet.update({
      where: { id: payeeWalletId },
      data: {
        balance: {
          increment: decimalValue,
        },
      },
    });

    return {
      updatePayerWallet,
      updatePayeeWallet,
    };
  }
}
