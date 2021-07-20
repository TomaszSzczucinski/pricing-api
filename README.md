## Description

Transaction Pricing API task

Created with nestjs (expressjs adapter). Also I'm using `axios`, `dayjs` and `jest-mock-extended`.

## Installation

```bash
$ npm install
```

## Running the app

We need to run docker container with postgresql database

```bash
docker-compose up -d // -d to run in background
```

Basically nestjs things

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```