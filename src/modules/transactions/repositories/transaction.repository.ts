import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Status } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  public async createCreditTransaction(
    payeeWalletId: string,
    value: number,
    status: Status,
  ) {
    return this.prismaService.transaction.create({
      data: {
        payeeWalletId,
        value,
        status,
      },
    });
  }

  public async createTransferTransaction(
    payerWalletId: string,
    payeeWalletId: string,
    value: number,
    status: Status,
  ) {
    return await this.prismaService.transaction.create({
      data: {
        payerWalletId,
        payeeWalletId,
        value,
        status,
      },
    });
  }
}
