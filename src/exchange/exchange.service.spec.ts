import { Test, TestingModule } from '@nestjs/testing';
import { ApiFetchService } from '../common/api-fetch.service';
import apiFetchMock from '../common/api-fetch.service.mock';
import { PrismaService } from '../common/prisma.service';
import prismaMock from '../common/prisma.service.mock';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: PrismaService,
          useFactory: () => prismaMock,
        },
        {
          provide: ApiFetchService,
          useFactory: () => apiFetchMock,
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return return exchange rates if status is 200 and rates are present', async () => {
    const rates = { r1: 1, r2: 2 };
    const responseData: any = {
      status: 200,
      data: { rates: rates },
    };

    apiFetchMock.getForDate.mockResolvedValueOnce(responseData);
    return expect(service.getExchangeRates('')).resolves.toEqual(rates);
  });

  it('should return null if status is other than 200', async () => {
    const rates = { r1: 1, r2: 2 };
    const responseData: any = {
      status: 404,
      data: { rates: rates },
    };

    apiFetchMock.getForDate.mockResolvedValueOnce(responseData);
    return expect(service.getExchangeRates('')).resolves.toBeNull();
  });

  it('should amount if currency is Euro', async () => {
    const amount = 12.12;
    return expect(service.amountToEuro(amount, 'EUR', {})).resolves.toEqual(amount);
  });
});
