import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from '../entities/favorite.entity';
import { User } from '../entities/user.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let favoritesService: jest.Mocked<FavoritesService>;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockFavorite: Favorite = {
    id: 1,
    userId: 1,
    resortId: 5,
    createdAt: new Date(),
    user: mockUser,
    resort: {} as Favorite['resort'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            create: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
            findByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    favoritesService = module.get(FavoritesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a favorite and set userId from current user', async () => {
      const createFavoriteDto: CreateFavoriteDto = { resortId: 5, userId: 0 };
      favoritesService.create.mockResolvedValue(mockFavorite);

      const result = await controller.create(mockUser, createFavoriteDto);

      expect(result).toEqual(mockFavorite);
      expect(createFavoriteDto.userId).toBe(mockUser.id);
      expect(favoritesService.create).toHaveBeenCalledWith(createFavoriteDto);
    });

    it('should propagate errors from favorites service', async () => {
      const createFavoriteDto: CreateFavoriteDto = { resortId: 5, userId: 0 };
      favoritesService.create.mockRejectedValue(
        new Error('This resort is already in favorites'),
      );

      await expect(
        controller.create(mockUser, createFavoriteDto),
      ).rejects.toThrow('This resort is already in favorites');
    });
  });

  describe('remove', () => {
    it('should remove a favorite', async () => {
      favoritesService.remove.mockResolvedValue(undefined);

      await controller.remove(mockUser, 5);

      expect(favoritesService.remove).toHaveBeenCalledWith(mockUser.id, 5);
    });

    it('should propagate NotFoundException from service', async () => {
      favoritesService.remove.mockRejectedValue(
        new Error('Favorite not found'),
      );

      await expect(controller.remove(mockUser, 999)).rejects.toThrow(
        'Favorite not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return all favorites', async () => {
      const favorites = [mockFavorite];
      favoritesService.findAll.mockResolvedValue(favorites);

      const result = await controller.findAll();

      expect(result).toEqual(favorites);
      expect(favoritesService.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no favorites exist', async () => {
      favoritesService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findByUserId', () => {
    it('should return favorites for a specific user', async () => {
      const favorites = [mockFavorite];
      favoritesService.findByUserId.mockResolvedValue(favorites);

      const result = await controller.findByUserId(1);

      expect(result).toEqual(favorites);
      expect(favoritesService.findByUserId).toHaveBeenCalledWith(1);
    });

    it('should return empty array when user has no favorites', async () => {
      favoritesService.findByUserId.mockResolvedValue([]);

      const result = await controller.findByUserId(999);

      expect(result).toEqual([]);
    });
  });
});
