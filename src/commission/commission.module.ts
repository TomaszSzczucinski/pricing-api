import { Module } from '@nestjs/common';
import { ApiFetchService } from '../common/api-fetch.service';
import { HelpersService } from '../common/helpers.service';
import { PrismaService } from '../common/prisma.service';
import { ExchangeModule } from '../exchange/exchange.module';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';
import { RulesService } from './rules.service';

@Module({
  controllers: [CommissionController],
  imports: [ExchangeModule],
  providers: [CommissionService, PrismaService, RulesService, HelpersService, ApiFetchService]
})
export class CommissionModule {}
