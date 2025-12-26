import { Test, TestingModule } from '@nestjs/testing';
import { ResortsController } from './resorts.controller';
import { ResortsService } from './resorts.service';
import { User } from '../entities/user.entity';

// Mock the pagination module
jest.mock('../../common/utils/pagination', () => ({
  getPaginationParams: jest.fn(),
  generatePaginationMeta: jest.fn(),
}));

describe('ResortsController', () => {
  let controller: ResortsController;
  let resortsService: {
    findAll: jest.Mock;
  };

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockResortsWithFavorite = [
    {
      id: 1,
      no: 1,
      name: 'Resort 1',
      place: 'Phuket',
      room: 'Deluxe',
      bed: '2 Queen',
      condition: 'Non-smoking',
      price: 'THB 3500',
      travelSustainableLevel: 'Level 2',
      rating: 8.5,
      totalReviews: '245 reviews',
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: true,
    },
  ];

  const mockPaginationMeta = {
    totalItems: 50,
    totalPages: 5,
    page: 1,
    pageSize: 10,
  };

  beforeEach(async () => {
    resortsService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResortsController],
      providers: [
        {
          provide: ResortsService,
          useValue: resortsService,
        },
      ],
    }).compile();

    controller = module.get<ResortsController>(ResortsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return resorts with pagination', async () => {
      const expectedResponse = {
        data: mockResortsWithFavorite,
        meta: mockPaginationMeta,
      };
      resortsService.findAll.mockResolvedValue(expectedResponse);

      const result = await controller.findAll(mockUser, 1, 10);

      expect(result).toEqual(expectedResponse);
      expect(resortsService.findAll).toHaveBeenCalledWith(mockUser, 1, 10);
    });

    it('should call findAll without pagination parameters', async () => {
      const expectedResponse = {
        data: mockResortsWithFavorite,
        meta: mockPaginationMeta,
      };
      resortsService.findAll.mockResolvedValue(expectedResponse);

      const result = await controller.findAll(mockUser, undefined, undefined);

      expect(result).toEqual(expectedResponse);
      expect(resortsService.findAll).toHaveBeenCalledWith(
        mockUser,
        undefined,
        undefined,
      );
    });

    it('should propagate errors from resorts service', async () => {
      resortsService.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll(mockUser, 1, 10)).rejects.toThrow(
        'Database error',
      );
    });

    it('should return empty data when no resorts exist', async () => {
      const emptyResponse = {
        data: [],
        meta: { totalItems: 0, totalPages: 0, page: 1, pageSize: 10 },
      };
      resortsService.findAll.mockResolvedValue(emptyResponse);

      const result = await controller.findAll(mockUser, 1, 10);

      expect(result.data).toEqual([]);
      expect(result.meta.totalItems).toBe(0);
    });
  });
});
