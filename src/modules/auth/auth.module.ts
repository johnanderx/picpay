import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { RegisterUseCase } from './useCases/register.useCase';
import { FindUserRepository } from './repositories/findUser.repository';
import { WalletRepository } from './repositories/wallet.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from './useCases/login.useCase';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtService,
    AuthRepository,
    FindUserRepository,
    WalletRepository,
    RegisterUseCase,
    LoginUseCase,
  ],
})
export class AuthModule {}
