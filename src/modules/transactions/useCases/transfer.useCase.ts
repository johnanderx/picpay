import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TransferRepository } from '../repositories/transfer.repository';
import { PrismaService } from 'src/share/services/prisma.service';
@Injectable()
export class TransferUseCase {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async transfer(
    userId: string,
    senderWalletId: string,
    receiverWalletId: string,
    value: number,
  ) {
    const senderWallet = await this.prismaService.wallet.findUnique({
      where: { id: senderWalletId },
    });

    if (!senderWallet) {
      throw new Error('Carteira do remetente não encontrada.');
    }

    if (senderWallet.userId !== userId) {
      throw new UnauthorizedException(
        'Você não tem permissão para usar esta carteira.',
      );
    }

    if (senderWallet.balance < value) {
      throw new Error('Saldo insuficiente na carteira do remetente.');
    }
    return await this.transferRepository.transfer(
      senderWalletId,
      receiverWalletId,
      value,
    );
  }
}
