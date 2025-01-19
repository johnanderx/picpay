import { IsNotEmpty } from 'class-validator';

export class CreditDto {
  @IsNotEmpty({ message: 'O payeeWallet não pode ser vazio.' })
  payeeWallet: string;

  @IsNotEmpty({ message: 'O valor não pode ser vazio.' })
  value: number;
}
