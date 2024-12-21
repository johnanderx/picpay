import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterRepository } from '../repositories/register.repository';
import { FindUserRepository } from '../repositories/find.user.repository';
import { User } from '../interfaces/user.interface';
@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly registerRepository: RegisterRepository,
    private readonly findUserRepository: FindUserRepository,
  ) {}
  async register(user: User) {
    const emailExists = await this.findUserRepository.findUserByEmail(
      user.email,
    );

    const cpfExists = await this.findUserRepository.findUserByCpf(user.cpf);

    const cnpjExists = await this.findUserRepository.findUserByCnpj(user.cnpj);

    if (cnpjExists && user.userType === 'COMMON') {
      throw new ConflictException(
        'Usuários com CNPJ não podem ser do tipo "COMMON".',
      );
    }

    if (emailExists) {
      throw new ConflictException('Email já existe.');
    }

    if (cpfExists) {
      throw new ConflictException('Cpf já existe.');
    }

    if (cnpjExists) {
      throw new ConflictException('Cnpj já existe.');
    }
    return await this.registerRepository.createUser(user);
  }
}
