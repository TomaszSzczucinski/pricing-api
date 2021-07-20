import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';
import { CommissionService } from './commission.service';
import { NewTransactionDto } from './dto/new-transaction.dto';

@Controller('commission')
export class CommissionController {
  constructor(private commissionService: CommissionService, private exchangeService: ExchangeService) {}

  @Get()
  async test() {
    return { test: 'ok' };
  }

  @Post()
  async newTransaction(@Body() newTransactionDto: NewTransactionDto) {

    if (newTransactionDto.currency.toUpperCase() !== 'EUR')
    {
      const exchangeRates = await this.exchangeService.getExchangeRates(
        newTransactionDto.date,
      );
      const amount = await this.exchangeService.amountToEuro(
        parseFloat(newTransactionDto.amount),
        newTransactionDto.currency,
        exchangeRates,
      );
      
      newTransactionDto.amount = String(amount);
    }
    
    if (!newTransactionDto.amount) throw new BadRequestException('Bad currency provided');

    const commissions = await this.commissionService.calculateCommissions(
      newTransactionDto,
    );

    const lowestCommission = await this.commissionService.chooseCommission(
      commissions,
    );

    // Insert transaction to database
    await this.commissionService.createTransaction(newTransactionDto);

    return {
      // TODO: Move it to some response transformer or sth like that
      amount: lowestCommission.toFixed(2),
      currency: 'EUR',
    };
  }
}
