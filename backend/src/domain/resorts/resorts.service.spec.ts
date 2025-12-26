import { Test, TestingModule } from '@nestjs/testing';
import { ResortsService } from './resorts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resort } from '../entities/resort.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { User } from '../entities/user.entity';
import { Favorite } from '../entities/favorite.entity';

// Mock the pagination module
jest.mock('../../common/utils/pagination', () => ({
  getPaginationParams: jest.fn((page?: number, pageSize?: number) => {
    const take = pageSize && pageSize > 0 ? Math.min(pageSize, 100) : 100;
    const skip = page && page > 0 ? (page - 1) * take : 0;
    return { skip, take };
  }),
  generatePaginationMeta: jest.fn(
    (totalItems: number, page?: number, pageSize?: number) => {
      const effectivePageSize =
        pageSize && pageSize > 0 ? Math.min(pageSize, 100) : 100;
      const totalPages = Math.ceil(totalItems / effectivePageSize);
      const currentPage = page && page > 0 ? page : 1;
      return {
        totalItems,
        totalPages,
        page: currentPage,
        pageSize: effectivePageSize,
      };
    },
  ),
}));

describe('ResortsService', () => {
  let service: ResortsService;
  let resortsRepository: {
    findAndCount: jest.Mock;
  };
  let favoritesService: {
    findByUserId: jest.Mock;
  };

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockResorts: Resort[] = [
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
    },
    {
      id: 2,
      no: 2,
      name: 'Resort 2',
      place: 'Bangkok',
      room: 'Standard',
      bed: '1 King',
      condition: 'Smoking allowed',
      price: 'THB 2500',
      travelSustainableLevel: 'Level 1',
      rating: 7.5,
      totalReviews: '120 reviews',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockFavorites: Favorite[] = [
    {
      id: 1,
      userId: 1,
      resortId: 1,
      createdAt: new Date(),
      user: mockUser,
      resort: mockResorts[0],
    },
  ];

  beforeEach(async () => {
    resortsRepository = {
      findAndCount: jest.fn(),
    };
    favoritesService = {
      findByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResortsService,
        {
          provide: getRepositoryToken(Resort),
          useValue: resortsRepository,
        },
        {
          provide: FavoritesService,
          useValue: favoritesService,
        },
      ],
    }).compile();

    service = module.get<ResortsService>(ResortsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return resorts with isFavorite flag', async () => {
      resortsRepository.findAndCount.mockResolvedValue([mockResorts, 2]);
      favoritesService.findByUserId.mockResolvedValue(mockFavorites);

      const result = await service.findAll(mockUser, 1, 10);

      expect(result.data).toHaveLength(2);
      expect(result.data[0].isFavorite).toBe(true);
      expect(result.data[1].isFavorite).toBe(false);
    });

    it('should return correct pagination metadata', async () => {
      resortsRepository.findAndCount.mockResolvedValue([mockResorts, 50]);
      favoritesService.findByUserId.mockResolvedValue([]);

      const result = await service.findAll(mockUser, 1, 10);

      expect(result.meta).toEqual({
        totalItems: 50,
        totalPages: 5,
        page: 1,
        pageSize: 10,
      });
    });

    it('should use default pagination when not provided', async () => {
      resortsRepository.findAndCount.mockResolvedValue([mockResorts, 2]);
      favoritesService.findByUserId.mockResolvedValue([]);

      await service.findAll(mockUser);

      expect(resortsRepository.findAndCount).toHaveBeenCalledWith({
        order: { id: 'ASC' },
        skip: 0,
        take: 100,
      });
    });

    it('should apply correct skip and take for pagination', async () => {
      resortsRepository.findAndCount.mockResolvedValue([mockResorts, 2]);
      favoritesService.findByUserId.mockResolvedValue([]);

      await service.findAll(mockUser, 2, 20);

      expect(resortsRepository.findAndCount).toHaveBeenCalledWith({
        order: { id: 'ASC' },
        skip: 20,
        take: 20,
      });
    });

    it('should return empty data when no resorts exist', async () => {
      resortsRepository.findAndCount.mockResolvedValue([[], 0]);
      favoritesService.findByUserId.mockResolvedValue([]);

      const result = await service.findAll(mockUser, 1, 10);

      expect(result.data).toEqual([]);
      expect(result.meta.totalItems).toBe(0);
    });

    it('should mark all resorts as not favorite when user has no favorites', async () => {
      resortsRepository.findAndCount.mockResolvedValue([mockResorts, 2]);
      favoritesService.findByUserId.mockResolvedValue([]);

      const result = await service.findAll(mockUser, 1, 10);

      expect(result.data.every((resort) => !resort.isFavorite)).toBe(true);
    });

    it('should call findByUserId with correct user id', async () => {
      resortsRepository.findAndCount.mockResolvedValue([mockResorts, 2]);
      favoritesService.findByUserId.mockResolvedValue([]);

      await service.findAll(mockUser, 1, 10);

      expect(favoritesService.findByUserId).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
