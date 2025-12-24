import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resort } from '../entities/resort.entity';
import { User } from '../entities';
import { FavoritesService } from '../favorites/favorites.service';
import { ResortWithFavoriteResponse } from './dto/resort-with-favorite.response';
import {
  generatePaginationMeta,
  getPaginationParams,
} from 'src/common/utils/pagination';
import { PaginationMeta } from 'src/common/types/pagination';

@Injectable()
export class ResortsService {
  constructor(
    @InjectRepository(Resort)
    private resortsRepository: Repository<Resort>,
    private readonly favoritesService: FavoritesService,
  ) {}

  async findAll(
    user: User,
    page?: number,
    pageSize?: number,
  ): Promise<{ data: ResortWithFavoriteResponse[]; meta: PaginationMeta }> {
    const { skip, take } = getPaginationParams(page, pageSize);

    const [resorts, totalCount] = await this.resortsRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      skip,
      take,
    });

    const favoriteResortIds = await this.favoritesService.findByUserId(user.id);
    const favoriteIdsSet = new Set(
      favoriteResortIds.map((fav) => fav.resortId),
    );

    const paginationMeta = generatePaginationMeta(totalCount, page, pageSize);

    return {
      data: resorts.map((resort) => ({
        ...resort,
        isFavorite: favoriteIdsSet.has(resort.id),
      })),
      meta: paginationMeta,
    };
  }
}
