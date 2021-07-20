import { Test, TestingModule } from '@nestjs/testing';
import { ApiFetchService } from '../common/api-fetch.service';
import apiFetchMock from '../common/api-fetch.service.mock';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';
import prismaMock from '../common/prisma.service.mock';
import { CommissionService } from './commission.service';
import { RulesService } from './rules.service';

describe('CommissionService', () => {
  let service: CommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommissionService,
        {
          provide: PrismaService,
          useFactory: () => prismaMock,
        },
        {
          provide: ApiFetchService,
          useFactory: () => apiFetchMock,
        },
        HelpersService,
        RulesService,
      ],
    }).compile();

    service = module.get<CommissionService>(CommissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return unique transaction', async () => {
    const data = { id: '123' };
    await service.transaction(data);
    return expect(prismaMock.transaction.findUnique).toHaveBeenCalledWith({where: data});
  });

  it('should return lowes commission withour null', async () => {
    const testCommissions = [null, null, 1.1, 1.4, 9, 0.1]
    return expect(service.chooseCommission(testCommissions)).resolves.toEqual(0.1);
  });
});
