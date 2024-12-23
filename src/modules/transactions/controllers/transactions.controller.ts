import { Controller, Post, Body, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { Credit } from '../interfaces/credit.interface';
import { CreditUseCase } from '../useCases/credit.useCase';
import { TransferUseCase } from '../useCases/transfer.useCase';
import { Transfer } from '../interfaces/transfer.interface';
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly creditUseCase: CreditUseCase,
    private readonly transferUseCase: TransferUseCase,
  ) {}
  @UseGuards(AuthGuard)
  @Post('credit')
  async credit(@Body() body: Credit, @Request() request) {
    try {
      const credit = await this.creditUseCase.addedCredit(
        request.user.id,
        body.senderWalletId,
        body.receiverWalletId,
        body.value,
      );
      return {
        message: 'Crédito efetuado com sucesso!',
        credit,
      };
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Post('transfer')
  async transfer(@Body() body: Transfer, @Request() request) {
    try {
      const transaction = await this.transferUseCase.transfer(
        request.user.id,
        body.senderWalletId,
        body.receiverWalletId,
        body.value,
      );
      return {
        message: 'Transferênca realizada com sucesso.',
        transaction,
      };
    } catch (error) {
      throw error;
    }
  }
}
