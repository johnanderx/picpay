import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { AuthGuard } from '../users/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreditUseCase } from './useCases/credit.useCase';
import { CreditRepository } from './repositories/credit.repository';
import { PrismaService } from 'src/share/services/prisma.service';
import { TransactionRepository } from './repositories/transacton.repository';
import { TransferUseCase } from './useCases/transfer.useCase';
import { TransferRepository } from './repositories/transfer.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    AuthGuard,
    JwtService,
    CreditRepository,
    TransactionRepository,
    TransferRepository,
    CreditUseCase,
    TransferUseCase,
    PrismaService,
  ],
})
export class TransactionsModule {}
