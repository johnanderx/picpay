import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/services/prisma.service';
import { User } from '../interfaces/user.interface';
import { encrypt } from '../utils/crypto';
import { WalletRepository } from './wallet.repository';
@Injectable()
export class RegisterRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly walletRepository: WalletRepository,
  ) {}
  async createUser(user: User) {
    const encryptedPassword = await encrypt(user.password);
    const createdUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: encryptedPassword,
        cpf: user.cpf,
        cnpj: user.cnpj,
        type: user.userType,
      },
    });
    await this.walletRepository.createWallet(createdUser.id);
    return createdUser;
  }
}
