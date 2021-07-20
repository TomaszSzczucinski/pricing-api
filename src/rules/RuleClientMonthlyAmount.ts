import { NewTransactionDto } from '../commission/dto/new-transaction.dto';
import { Rule } from './rule';

export class RuleClientMonthlyAmount extends Rule {
  public async calculate(data: NewTransactionDto) {
    // new Date to date from request
    const actualMonth = await this.helpersService.monthFromString(data.date);

    // This should be placed inside transaction service but I'll leave it here now
    const thisMonthTransactionsAmount = await this.prismaService.transaction
      .findMany({
        where: {
          clientId: data.client_id,
          month: actualMonth,
        },
      })
      .then((transactions) => {
        let sum = 0;
        transactions.forEach((transaction) => {
          // if (transaction.date == actualYear)
          sum += transaction.amount;
        });
        return sum;
      });

    // Also to config
    return thisMonthTransactionsAmount >= 1000.0 ? 0.03 : null;
  }
}
