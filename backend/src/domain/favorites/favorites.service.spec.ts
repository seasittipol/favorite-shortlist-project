import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Favorite } from '../entities/favorite.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let favoritesRepository: jest.Mocked<Repository<Favorite>>;

  const mockFavorite: Favorite = {
    id: 1,
    userId: 1,
    resortId: 5,
    createdAt: new Date(),
    user: null as any,
    resort: null as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    favoritesRepository = module.get(getRepositoryToken(Favorite));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createFavoriteDto = { userId: 1, resortId: 5 };

    it('should create a new favorite when it does not exist', async () => {
      favoritesRepository.findOne.mockResolvedValue(null);
      favoritesRepository.create.mockReturnValue(mockFavorite);
      favoritesRepository.save.mockResolvedValue(mockFavorite);

      const result = await service.create(createFavoriteDto);

      expect(result).toEqual(mockFavorite);
      expect(favoritesRepository.findOne).toHaveBeenCalledWith({
        where: {
          userId: createFavoriteDto.userId,
          resortId: createFavoriteDto.resortId,
        },
      });
      expect(favoritesRepository.create).toHaveBeenCalledWith(
        createFavoriteDto,
      );
      expect(favoritesRepository.save).toHaveBeenCalledWith(mockFavorite);
    });

    it('should throw ConflictException when favorite already exists', async () => {
      favoritesRepository.findOne.mockResolvedValue(mockFavorite);

      await expect(service.create(createFavoriteDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(createFavoriteDto)).rejects.toThrow(
        'This resort is already in favorites',
      );
    });
  });

  describe('remove', () => {
    it('should remove favorite when it exists', async () => {
      favoritesRepository.findOne.mockResolvedValue(mockFavorite);
      favoritesRepository.remove.mockResolvedValue(mockFavorite);

      await service.remove(1, 5);

      expect(favoritesRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1, resortId: 5 },
      });
      expect(favoritesRepository.remove).toHaveBeenCalledWith(mockFavorite);
    });

    it('should throw NotFoundException when favorite does not exist', async () => {
      favoritesRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1, 999)).rejects.toThrow(NotFoundException);
      await expect(service.remove(1, 999)).rejects.toThrow(
        'Favorite with ID 999 not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return all favorites with relations', async () => {
      const favorites = [mockFavorite];
      favoritesRepository.find.mockResolvedValue(favorites);

      const result = await service.findAll();

      expect(result).toEqual(favorites);
      expect(favoritesRepository.find).toHaveBeenCalledWith({
        relations: ['user', 'resort'],
        order: {
          createdAt: 'DESC',
        },
      });
    });

    it('should return empty array when no favorites exist', async () => {
      favoritesRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findByUserId', () => {
    it('should return favorites for a specific user', async () => {
      const userFavorites = [mockFavorite];
      favoritesRepository.find.mockResolvedValue(userFavorites);

      const result = await service.findByUserId(1);

      expect(result).toEqual(userFavorites);
      expect(favoritesRepository.find).toHaveBeenCalledWith({
        where: { userId: 1 },
        relations: ['resort'],
        order: {
          createdAt: 'DESC',
        },
      });
    });

    it('should return empty array when user has no favorites', async () => {
      favoritesRepository.find.mockResolvedValue([]);

      const result = await service.findByUserId(999);

      expect(result).toEqual([]);
    });
  });
});
