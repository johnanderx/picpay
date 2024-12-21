import { Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/share/services/prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createTransaction(
    senderWalletId,
    receiverWalletId: string,
    value: number,
    status: TransactionStatus,
  ) {
    return await this.prismaService.transaction.create({
      data: {
        senderWalletId,
        receiverWalletId,
        value,
        status,
      },
    });
  }
}
