import { Module } from '@nestjs/common';
import { USersControllers } from './controllers/users.controller';
import { RegisterUseCase } from './useCases/register.useCase';

@Module({
  controllers: [USersControllers],
  providers: [RegisterUseCase],
})
export class UsersModule {}
