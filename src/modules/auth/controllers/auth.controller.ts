import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { RegisterUseCase } from '../useCases/register.useCase';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() dto: UserDto) {
    try {
      const user = await this.registerUseCase.execute(dto);
      return {
        message: 'Usário criado com sucesso.',
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}
