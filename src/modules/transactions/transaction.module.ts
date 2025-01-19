import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { CreditRepository } from './repositories/credit.repository';
import { PrismaService } from 'src/services/prisma.service';
import { CreditUseCase } from './useCase/credit.useCase';
import { TransactionRepository } from './repositories/transaction.repository';
import { FindWalletRepository } from './repositories/findWallet.repository';
@Module({
  controllers: [TransactionController],
  providers: [
    PrismaService,
    CreditRepository,
    TransactionRepository,
    FindWalletRepository,
    CreditUseCase,
  ],
})
export class TransactionModule {}
