import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { Credit } from '../interfaces/credit.interface';
@Controller('transactions')
export class TransactionsController {
  @UseGuards(AuthGuard)
  @Post('credit')
  async credit(@Body() body: Credit) {
    console.log(body);
  }
}
