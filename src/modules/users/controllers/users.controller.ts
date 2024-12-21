import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { RegisterUseCase } from '../useCases/register.useCase';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Login } from '../interfaces/user.interface';
import { LoginUseCase } from '../useCases/login.useCase';
@Controller('auth')
export class UsersControllers {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() dto: UserDto) {
    try {
      const user = await this.registerUseCase.register(dto);
      return {
        message: 'Usuário cadastrado com sucesso!',
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: Login) {
    try {
      const { token } = await this.loginUseCase.login(
        body.email,
        body.password,
      );
      return {
        message: 'Usário autenticado com sucesso.',
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
