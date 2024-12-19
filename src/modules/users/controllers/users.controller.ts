import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class USersControllers {
  @Post('register')
  async register() {}
}
