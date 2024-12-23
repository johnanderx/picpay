import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TransferRepository } from '../repositories/transfer.repository';
import { PrismaService } from 'src/share/services/prisma.service';
import { FindUserRepository } from 'src/modules/users/repositories/find.user.repository';
@Injectable()
export class TransferUseCase {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly prismaService: PrismaService,
    private readonly findUserRepository: FindUserRepository,
  ) {}

  async transfer(
    userId: string,
    senderWalletId: string,
    receiverWalletId: string,
    value: number,
  ) {
    const cnpjExists = await this.findUserRepository.findUserById(userId);
    const senderWallet = await this.prismaService.wallet.findUnique({
      where: { id: senderWalletId },
    });

    if (!senderWallet) {
      throw new Error('Carteira do remetente não encontrada.');
    }

    if (cnpjExists.cnpj) {
      throw new UnauthorizedException(
        'Somente usuários comuns podem realizar transferências.',
      );
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
