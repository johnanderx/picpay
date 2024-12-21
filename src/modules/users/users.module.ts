import { Module } from '@nestjs/common';
import { UsersControllers } from './controllers/users.controller';
import { RegisterUseCase } from './useCases/register.useCase';
import { RegisterRepository } from './repositories/register.repository';
import { PrismaService } from 'src/share/services/prisma.service';
import { FindUserRepository } from './repositories/find.user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from './useCases/login.useCase';
import { WalletRepository } from './repositories/wallet.repository';
@Module({
  controllers: [UsersControllers],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    RegisterRepository,
    FindUserRepository,
    WalletRepository,
    PrismaService,
    JwtService,
  ],
})
export class UsersModule {}
