import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { FindUserRepository } from '../repositories/find.user.repository';
import { decrypt } from '../utils/crypto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.findUserRepository.findUserByEmail(email);

    if (!user.email) {
      throw new NotFoundException('Email não encontrado.');
    }

    const passwordIsValid = decrypt(password, user.password);

    if (!passwordIsValid) {
      throw new ConflictException('Senha inválida.');
    }

    const payload = { email: user.email, id: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { user, token };
  }
}
