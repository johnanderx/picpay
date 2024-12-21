import { Injectable } from '@nestjs/common';
import { RegisterRepository } from '../repositories/register.repository';
import { User } from '../interfaces/user.interface';
@Injectable()
export class RegisterUseCase {
  constructor(private readonly registerRepository: RegisterRepository) {}
  async register(user: User) {
    return await this.registerRepository.createUser(user);
  }
}
