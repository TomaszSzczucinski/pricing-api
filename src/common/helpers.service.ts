import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class HelpersService {
  async monthNumber(date: Date) {
    return dayjs(date).month();
  }

  async monthFromString(date: string) {
    return dayjs(date).month();
  }

  async stringToDate(date: string) {
    return dayjs(date).toDate();
  }

  async isCurrentYear(date: Date) {
    return dayjs(date).isSame(dayjs(), 'year')
  }
}
