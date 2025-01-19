import { IsNotEmpty } from 'class-validator';

export class TransferDto {
  @IsNotEmpty({ message: 'O payerWallet não pode ser vazio.' })
  payerWallet: string;

  @IsNotEmpty({ message: 'O payeeWallet não pode ser vazio.' })
  payeeWallet: string;

  @IsNotEmpty({ message: 'O valor não pode ser vazio.' })
  value: number;
}
