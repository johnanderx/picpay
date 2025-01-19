import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindUserRepository } from '../repositories/findUser.repository';
import { validatePassword } from '../utils/functions/crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(email: string, password: string) {
    const user = await this.findUserRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('E-mail não cadastrado.');
    }

    const hash = user.password;
    const passwordIsValid = await validatePassword(password, hash);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      user,
      token,
    };
  }
}
