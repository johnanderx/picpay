import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async registerUser(user: User) {
    return await this.prismaService.user.create({ data: user });
  }
}
