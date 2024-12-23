import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/services/prisma.service';

@Injectable()
export class TransferRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async transfer(
    senderWalletId: string,
    receiverWalletId: string,
    value: number,
  ) {
    const updateSenderWallet = await this.prismaService.wallet.update({
      where: { id: senderWalletId },
      data: { balance: { decrement: value } },
    });

    const updatedReceiverWallet = await this.prismaService.wallet.update({
      where: { id: receiverWalletId },
      data: { balance: { increment: value } },
    });
    return {
      updateSenderWallet,
      updatedReceiverWallet,
    };
  }
}
