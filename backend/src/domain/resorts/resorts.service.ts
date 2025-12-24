import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resort } from '../entities/resort.entity';
import { User } from '../entities';
import { FavoritesService } from '../favorites/favorites.service';
import { ResortWithFavoriteResponse } from './dto/resort-with-favorite.response';

@Injectable()
export class ResortsService {
  constructor(
    @InjectRepository(Resort)
    private resortsRepository: Repository<Resort>,
    private readonly favoritesService: FavoritesService,
  ) {}

  async findAll(user: User): Promise<ResortWithFavoriteResponse[]> {
    const resorts = await this.resortsRepository.find({
      order: {
        id: 'ASC',
      },
    });

    const favoriteResortIds = await this.favoritesService.findByUserId(user.id);
    const favoriteIdsSet = new Set(
      favoriteResortIds.map((fav) => fav.resortId),
    );

    return resorts.map((resort) => ({
      ...resort,
      isFavorite: favoriteIdsSet.has(resort.id),
    }));
  }
}
