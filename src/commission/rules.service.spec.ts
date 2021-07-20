import { Test, TestingModule } from '@nestjs/testing';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';
import { RulesService } from './rules.service';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulesService, HelpersService, PrismaService],
    }).compile();

    service = module.get<RulesService>(RulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
