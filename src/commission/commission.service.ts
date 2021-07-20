import { Injectable } from '@nestjs/common';
import { prisma, Prisma } from '@prisma/client';
import { ApiFetchService } from '../common/api-fetch.service';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { RulesService } from './rules.service';

@Injectable()
export class CommissionService {
  constructor(
    private rulesService: RulesService,
    private prismaService: PrismaService,
    private helpersService: HelpersService,
  ) {}

  async transaction(where: Prisma.TransactionWhereUniqueInput) {
    return this.prismaService.transaction.findUnique({ where });
  }

  async transactions(where: Prisma.TransactionWhereInput) {
    return this.prismaService.transaction.findMany({ where });
  }

  async createTransaction(data: NewTransactionDto) {
    return this.prismaService.transaction.create({
      data: {
        amount: parseFloat(data.amount),
        clientId: data.client_id,
        currency: data.currency,
        date: await this.helpersService.stringToDate(data.date),
        month: await this.helpersService.monthFromString(data.date),
      },
    });
  }

  async calculateCommissions(data: NewTransactionDto): Promise<number[]> {
    return this.rulesService.calculate(data);
  }

  async chooseCommission(commissions: number[]): Promise<number> {
    commissions = commissions.filter((a) => a !== null);
    return commissions.sort((a, b) => a - b)[0];
  }
}
