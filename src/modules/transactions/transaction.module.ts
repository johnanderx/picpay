import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { CreditRepository } from './repositories/credit.repository';
import { PrismaService } from 'src/services/prisma.service';
import { CreditUseCase } from './useCase/credit.useCase';
import { TransactionRepository } from './repositories/transaction.repository';
import { FindWalletRepository } from './repositories/findWallet.repository';
import { TransfersUseCase } from './useCase/transfers.useCase';
import { TransfersRepository } from './repositories/transfers.repository';
import { FindUserRepository } from '../auth/repositories/findUser.repository';
@Module({
  controllers: [TransactionController],
  providers: [
    PrismaService,
    CreditRepository,
    TransactionRepository,
    FindWalletRepository,
    TransfersRepository,
    FindUserRepository,
    CreditUseCase,
    TransfersUseCase,
  ],
})
export class TransactionModule {}
