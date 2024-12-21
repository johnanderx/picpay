import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreditRepository } from '../repositories/credit.repository';
import { TransactionRepository } from '../repositories/transacton.repository';
import { TransactionStatus } from '@prisma/client';
@Injectable()
export class CreditUseCase {
  constructor(
    private readonly creditRepository: CreditRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}
  async addedCredit(
    senderWalletId: string,
    receiverWalletId: string,
    value: number,
  ) {
    let status: TransactionStatus = 'PENDING';
    let isAuthorization = false;
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
