import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiFetchService {
  async get(url: string) {
    return axios(url);
  }

  async getForDate(date: string) {
    // TODO: Move url to .env file
    // TODO: Create exchange rates service and do this inside exchangeRate service
    // keeping api service only for handlig requests to api
    return this.get(`https://api.exchangerate.host/${date}`);
  }
}
