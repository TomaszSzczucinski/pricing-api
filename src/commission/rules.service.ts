import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';
import { Rule } from '../rules/rule';
import { RuleClientMonthlyAmount } from '../rules/RuleClientMonthlyAmount';
import { RuleClientPremium } from '../rules/ruleClientPremium';
import { NewTransactionDto } from './dto/new-transaction.dto';

@Injectable()
export class RulesService {
  rules: Rule[];

  constructor(
    private helpersService: HelpersService,
    private prismaService: PrismaService,
  ) {
    this.rules = [
      new Rule(helpersService, prismaService),
      new RuleClientPremium(helpersService, prismaService),
      new RuleClientMonthlyAmount(helpersService, prismaService),
    ];
  }

  async calculate(data: NewTransactionDto): Promise<number[]> {
    return Promise.all(this.rules.map((r: Rule) => r.calculate(data)));
  }
}
