import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { RegisterUseCase } from './useCases/register.useCase';
import { FindUserRepository } from './repositories/findUser.repository';
import { WalletRepository } from './repositories/wallet.repository';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthRepository,
    FindUserRepository,
    WalletRepository,
    RegisterUseCase,
  ],
})
export class AuthModule {}
