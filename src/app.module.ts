import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transactions/transaction.module';
@Module({
  imports: [AuthModule, TransactionModule],
})
export class AppModule {}
