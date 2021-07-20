import { Injectable } from '@nestjs/common';
import { ApiFetchService } from '../common/api-fetch.service';

@Injectable()
export class ExchangeService {
  constructor(private apiFetchService: ApiFetchService) {}

  async getExchangeRates(date: string): Promise<any> {
    const data = await this.apiFetchService.getForDate(date);
    if (data.status === 200 && data.data.rates) {
      return data.data.rates;
    } else return null;
  }

  async amountToEuro(amount: number, currency: string, exchangeRates: {}) {
    currency = currency.toUpperCase();
    if (currency === 'EUR') return amount;

    // TODO Parse currency (parse codes or full names)
    const exchangeRate = exchangeRates[currency];

    return amount * exchangeRate;
  }
}
