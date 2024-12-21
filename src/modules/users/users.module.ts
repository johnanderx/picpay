import { Module } from '@nestjs/common';
import { UsersControllers } from './controllers/users.controller';
import { RegisterUseCase } from './useCases/register.useCase';
import { RegisterRepository } from './repositories/register.repository';
import { PrismaService } from 'src/share/prisma.service';
import { FindUserRepository } from './repositories/find.user.repository';

@Module({
  controllers: [UsersControllers],
  providers: [
    RegisterUseCase,
    RegisterRepository,
    FindUserRepository,
    PrismaService,
  ],
})
export class UsersModule {}
