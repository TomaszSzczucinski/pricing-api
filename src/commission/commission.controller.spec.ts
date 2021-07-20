import { Test, TestingModule } from '@nestjs/testing';
import { ApiFetchService } from '../common/api-fetch.service';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';
import { ExchangeService } from '../exchange/exchange.service';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';
import { RulesService } from './rules.service';

describe('CommissionController', () => {
  let controller: CommissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionController],
      // Should be replaced with mocks
      providers: [
        CommissionService,
        PrismaService,
        ApiFetchService,
        HelpersService,
        RulesService,
        ExchangeService,
      ],
    }).compile();

    controller = module.get<CommissionController>(CommissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
