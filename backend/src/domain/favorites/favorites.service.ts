import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    // Check if favorite already exists
    const existingFavorite = await this.favoritesRepository.findOne({
      where: {
        userId: createFavoriteDto.userId,
        resortId: createFavoriteDto.resortId,
      },
    });

    if (existingFavorite) {
      throw new ConflictException('This resort is already in favorites');
    }

    const favorite = this.favoritesRepository.create(createFavoriteDto);
    return this.favoritesRepository.save(favorite);
  }

  async remove(id: number): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    await this.favoritesRepository.remove(favorite);
  }

  async findAll(): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      relations: ['user', 'resort'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { userId },
      relations: ['resort'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
