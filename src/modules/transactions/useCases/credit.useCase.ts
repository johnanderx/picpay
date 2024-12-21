import { Injectable } from '@nestjs/common';
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
    const credit = await this.creditRepository.addCredit(
      receiverWalletId,
      value,
    );
    let status: TransactionStatus = 'PENDING';
    if (credit) {
      status = 'SUCCESS';
    } else {
      status = 'FAILED';
    }

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
  }
}
