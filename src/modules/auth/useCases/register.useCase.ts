import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { FindUserRepository } from '../repositories/findUser.repository';
import { WalletRepository } from '../repositories/wallet.repository';
import { encryptPassword } from '../utils/functions/crypto';
@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async execute(user: User) {
    const emailExists = await this.findUserRepository.findUserByEmail(
      user.email,
    );
    const cpfExists = await this.findUserRepository.findUserByCpf(user.cpf);
    const cnpjExists = await this.findUserRepository.findUserByCnpj(user.cnpj);

    if (emailExists) {
      throw new ConflictException('Este E-mail já existe.');
    }

    if (cpfExists) {
      throw new ConflictException('Este CPF já existe.');
    }

    if (cnpjExists) {
      throw new ConflictException('Este CNPJ já existe.');
    }
    if (user.userType === 'COMMON' && user.cnpj) {
      throw new UnauthorizedException(
        'Usuários com CNPJ não podem ser do tipo "COMMON". Por favor, altere para "MERCHANT".',
      );
    }

    if (user.userType === 'MERCHANT' && !user.cnpj) {
      throw new UnauthorizedException(
        'Usuários sem CNPJ não podem ser do tipo "MERCHANT". Por favor, altere para "COMMON".',
      );
    }

    const hash = await encryptPassword(user.password);
    const userEncrypted = {
      ...user,
      password: hash,
    };

    const createdUser = await this.authRepository.registerUser(userEncrypted);

    await this.walletRepository.createWallet(createdUser.id);

    return createdUser;
  }
}
