import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/prisma.service';
import { User } from '../interfaces/user.interface';
import { FindUserRepository } from './find.user.repository';
import { encrypt } from '../utils/crypto';
@Injectable()
export class RegisterRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findUserRepository: FindUserRepository,
  ) {}
  async createUser(user: User) {
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

    const encryptedPassword = await encrypt(user.password);

    return await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: encryptedPassword,
        cpf: user.cpf,
        cnpj: user.cnpj,
        type: user.userType,
      },
    });
  }
}
