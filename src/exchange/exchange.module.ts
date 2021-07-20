import { Module } from '@nestjs/common';
import { ApiFetchService } from '../common/api-fetch.service';
import { PrismaService } from '../common/prisma.service';
import { ExchangeService } from './exchange.service';

@Module({
  providers: [ExchangeService, ApiFetchService, PrismaService],
  exports: [ExchangeService]
})
export class ExchangeModule {}
