import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { RegisterUseCase } from '../useCases/register.useCase';
import { LoginUseCase } from '../useCases/login.useCase';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() dto: UserDto) {
    try {
      const user = await this.registerUseCase.execute(dto);
      return {
        message: 'O usuário foi criado com sucesso.',
        user,
      };
    } catch (error) {
      throw error;
    }
  }
  @Post('login')
  public async login(@Body() dto: LoginDto) {
    try {
      const { user, token } = await this.loginUseCase.execute(
        dto.email,
        dto.password,
      );
      return {
        message: 'O usuário foi autenticado com sucesso',
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
