import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { RegisterUseCase } from '../useCases/register.useCase';
import { UsePipes, ValidationPipe } from '@nestjs/common';
@Controller('auth')
export class UsersControllers {
  constructor(private readonly registerUseCase: RegisterUseCase) {}
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
      console.error('Erro capturado no controlador:', error);
      throw error;
    }
  }
}
