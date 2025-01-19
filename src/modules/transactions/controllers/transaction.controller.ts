import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreditUseCase } from '../useCase/credit.useCase';
import { CreditDto } from '../dtos/credit.dto';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly creditUseCase: CreditUseCase) {}
  @Post('credit')
  public async credit(@Body() dto: CreditDto) {
    await this.creditUseCase.execute(dto.payeeWallet, Number(dto.value));
    return {
      message: 'Crédito efetuado com sucesso.',
    };
  }
}
