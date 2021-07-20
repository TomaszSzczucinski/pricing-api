import { Test, TestingModule } from '@nestjs/testing';
import { ApiFetchService } from './api-fetch.service';

describe('ApiFetchService', () => {
  let service: ApiFetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFetchService],
    }).compile();

    service = module.get<ApiFetchService>(ApiFetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
