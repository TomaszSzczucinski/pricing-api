import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NewTransactionDto } from '../src/commission/dto/new-transaction.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('/commission (POST) - Testing rule #1', async () => {
    const payload: NewTransactionDto = {
      amount: '200',
      client_id: 12,
      currency: 'EUR',
      date: '2021-01-01',
    };

    return request(app.getHttpServer())
      .post('/commission')
      .send(payload)
      .expect(201)
      .then((response: any) => {
        expect(response.body.amount).toEqual("1.00");
      });
  });

  it('/commission (POST) - Testing rule #2', async () => {
    const payload: NewTransactionDto = {
      amount: '200',
      client_id: 42,
      currency: 'EUR',
      date: '2021-01-01',
    };

    return request(app.getHttpServer())
      .post('/commission')
      .send(payload)
      .expect(201)
      .then((response: any) => {
        expect(response.body.amount).toEqual("0.05");
      });
  });

  it('/commission (POST) - Testing rule #3', async () => {
    const payload: NewTransactionDto = {
      amount: '1000',
      client_id: 321,
      currency: 'EUR',
      date: '2021-01-01',
    };

    await request(app.getHttpServer()).post('/commission').send(payload);

    return request(app.getHttpServer())
      .post('/commission')
      .send(payload)
      .expect(201)
      .then((response: any) => {
        expect(response.body.amount).toEqual("0.03");
      });
  });
});
