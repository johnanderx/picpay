import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreditRepository } from '../repositories/credit.repository';
import { TransactionRepository } from '../repositories/transacton.repository';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/share/services/prisma.service';
@Injectable()
export class CreditUseCase {
  constructor(
    private readonly creditRepository: CreditRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async addedCredit(
    userId: string,
    senderWalletId: string,
    receiverWalletId: string,
    value: number,
  ) {
    let status: TransactionStatus = 'PENDING';
    let isAuthorization = true;
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
    if (isAuthorization) {
      status = 'SUCCESS';
      const credit = await this.creditRepository.addCredit(
        receiverWalletId,
        value,
      );
      const transaction = await this.transactionRepository.createTransaction(
        senderWalletId,
        receiverWalletId,
        value,
        status,
      );
      return {
        credit,
        transaction,
      };
    } else {
      status = 'FAILED';
      await this.transactionRepository.createTransaction(
        senderWalletId,
        receiverWalletId,
        value,
        status,
      );
      throw new ConflictException('Falha na transação.');
    }
  }
}
