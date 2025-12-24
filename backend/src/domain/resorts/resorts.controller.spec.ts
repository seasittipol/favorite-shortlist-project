import { Test, TestingModule } from '@nestjs/testing';
import { ResortsController } from './resorts.controller';

describe('ResortsController', () => {
  let controller: ResortsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResortsController],
    }).compile();

    controller = module.get<ResortsController>(ResortsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
