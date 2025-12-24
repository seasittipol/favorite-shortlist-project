import { Test, TestingModule } from '@nestjs/testing';
import { ResortsService } from './resorts.service';

describe('ResortsService', () => {
  let service: ResortsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResortsService],
    }).compile();

    service = module.get<ResortsService>(ResortsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
