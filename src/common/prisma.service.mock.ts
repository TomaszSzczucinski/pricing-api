const prismaFunctions = {
  aggregate: jest.fn(),
  create: jest.fn(),
  findUnique: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
  createMany: jest.fn(),
  delete: jest.fn(),
  deleteMany: jest.fn(),
  update: jest.fn(),
  updateMany: jest.fn(),
  count: jest.fn(),
  upsert: jest.fn(),
  groupBy: jest.fn(),
};

const prismaMock = {
  transaction: prismaFunctions,
};

beforeEach(() => {
  jest.resetAllMocks();
});

export default prismaMock;
