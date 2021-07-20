import { NewTransactionDto } from '../commission/dto/new-transaction.dto';
import { Rule } from './rule';

export class RuleClientPremium extends Rule {
  public async calculate(data: NewTransactionDto) {
    return data.client_id === 42 ? 0.05 : null;
  }
}
