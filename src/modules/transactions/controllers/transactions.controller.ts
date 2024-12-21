import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { Credit } from '../interfaces/credit.interface';
import { CreditUseCase } from '../useCases/credit.useCase';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly creditUseCase: CreditUseCase) {}
  @UseGuards(AuthGuard)
  @Post('credit')
  async credit(@Body() body: Credit) {
    try {
      const credit = await this.creditUseCase.addedCredit(
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
}
