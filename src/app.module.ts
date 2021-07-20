import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommissionModule } from './commission/commission.module';
import { PrismaService } from './common/prisma.service';
import { HelpersService } from './common/helpers.service';
import { ApiFetchService } from './common/api-fetch.service';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [CommissionModule, ExchangeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, HelpersService, ApiFetchService],
})
export class AppModule {}
