import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { AuthGuard } from '../users/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TransactionsController],
  providers: [AuthGuard, JwtService],
})
export class TransactionsModule {}
