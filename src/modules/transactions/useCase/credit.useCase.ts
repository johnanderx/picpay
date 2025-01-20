import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreditRepository } from '../repositories/credit.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { FindWalletRepository } from '../repositories/findWallet.repository';
import { Status } from '@prisma/client';
import { NotificationService } from 'src/services/notification.service';
import { FindUserRepository } from 'src/modules/auth/repositories/findUser.repository';
@Injectable()
export class CreditUseCase {
  constructor(
    private readonly creditRepository: CreditRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly findWalletRepository: FindWalletRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly notificationService: NotificationService,
  ) {}
  public async execute(payeeWalletId: string, value: number) {
    const payeeWallet =
      await this.findWalletRepository.findWalletById(payeeWalletId);
    const authorization = true;
    let status: Status = Status.PENDING;

    if (!authorization) {
      status = Status.FAILED;
      throw new UnauthorizedException(
        'Você não tem autorização para realizar este depósito.',
      );
    }

    if (!payeeWallet) {
      throw new NotFoundException('Carteira do beneficiário não encontrada.');
    }

    const user = await this.findUserRepository.findUserById(payeeWallet.userId);

    if (value <= 0) {
      throw new ConflictException('O valor deve ser superior a R$ 0,00.');
    }

    status = Status.SUCCESS;

    await this.transactionRepository.createCreditTransaction(
      payeeWalletId,
      value,
      status,
    );
    await this.creditRepository.insertCredit(payeeWalletId, value);
    await this.notificationService.sendMail(
      user.email,
      'Débito creditado',
      'Débito creditado na sua conta.',
    );
  }
}
