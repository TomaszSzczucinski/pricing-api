import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import prismaMock from './prisma.service.mock';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: PrismaService,
        useFactory: () => prismaMock
      }],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });  
});
