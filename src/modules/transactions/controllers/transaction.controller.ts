import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreditUseCase } from '../useCase/credit.useCase';
import { CreditDto } from '../dtos/credit.dto';
import { TransferDto } from '../dtos/transfer.dto';
import { TransfersUseCase } from '../useCase/transfers.useCase';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly creditUseCase: CreditUseCase,
    private readonly transfersUseCase: TransfersUseCase,
  ) {}
  @Post('credit')
  public async credit(@Body() dto: CreditDto) {
    await this.creditUseCase.execute(dto.payeeWallet, Number(dto.value));
    return {
      message: 'Crédito efetuado com sucesso.',
    };
  }

  @Post('transfer')
  public async transfer(@Body() dto: TransferDto, @Request() request) {
    const transaction = await this.transfersUseCase.execute(
      dto.payerWallet,
      dto.payeeWallet,
      request.user.id,
      Number(dto.value),
    );

    return { message: 'Transação efetuada com sucesso.', transaction };
  }
}
