import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Status } from '@prisma/client';
@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  public async createTransaction(
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
}
