import { NewTransactionDto } from '../commission/dto/new-transaction.dto';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';

export class Rule {
  config: any;
  helpersService: HelpersService;
  prismaService: PrismaService;
  constructor(helperService: HelpersService, prismaService: PrismaService) {
    this.helpersService = helperService;
    this.prismaService = prismaService;
  }

  public async calculate(data: NewTransactionDto) {
    const { amount } = data;
    const price = (parseFloat(amount) / 100) * 0.5;
    return price < 0.5 ? 0.5 : price;
  }
}
