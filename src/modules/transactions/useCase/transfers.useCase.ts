import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { FindWalletRepository } from '../repositories/findWallet.repository';
import { Status } from '@prisma/client';
import { TransfersRepository } from '../repositories/transfers.repository';
import { FindUserRepository } from 'src/modules/auth/repositories/findUser.repository';
import { NotificationService } from 'src/services/notification.service';
@Injectable()
export class TransfersUseCase {
  constructor(
    private readonly transfersRepository: TransfersRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly findWalletRepository: FindWalletRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly notificationService: NotificationService,
  ) {}
  public async execute(
    payerWalletId: string,
    payeeWalletId: string,
    walletOwner: string,
    value: number,
  ) {
    const payerWallet =
      await this.findWalletRepository.findWalletById(payerWalletId);
    const payeeWallet =
      await this.findWalletRepository.findWalletById(payeeWalletId);
    const authorization = true;
    let status: Status = Status.PENDING;

    if (payerWallet.userId !== walletOwner) {
      throw new UnauthorizedException('Você não é o dono desta carteira.');
    }

    const payerUser = await this.findUserRepository.findUserById(walletOwner);
    const payeeUser = await this.findUserRepository.findUserById(
      payeeWallet.userId,
    );
    if (payerUser.userType === 'MERCHANT') {
      throw new UnauthorizedException(
        'Usuários do tipo "MERCHANT" não podem realizar transferências.',
      );
    }
    if (!authorization) {
      status = Status.FAILED;
      throw new UnauthorizedException(
        'Você não tem autorização para realizar a transferência.',
      );
    }
    if (!payerWallet) {
      throw new NotFoundException('Carteira do pagador não encontrada.');
    }

    if (!payeeWallet) {
      throw new NotFoundException('Carteira do beneficiário não encontrada.');
    }

    if (payerWallet.balance.toNumber() <= 0) {
      throw new ConflictException('O valor deve ser superior a R$ 0,00.');
    }

    if (value <= 0) {
      throw new ConflictException('O valor deve ser superior a R$ 0,00.');
    }

    status = Status.SUCCESS;

    await this.transactionRepository.createTransferTransaction(
      payerWalletId,
      payeeWalletId,
      value,
      status,
    );
    await this.transfersRepository.transfer(
      payerWalletId,
      payeeWalletId,
      value,
    );
    await this.notificationService.sendMail(
      payeeUser.email,
      'Transferência Recebida',
      'Uma transferência foi creditada em sua conta.',
    );
  }
}
