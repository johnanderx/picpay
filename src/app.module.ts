import { Module } from '@nestjs/common';
import { USersControllers } from './modules/users/controllers/users.controller';

@Module({
  imports: [USersControllers],
})
export class AppModule {}
