import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResortsController } from './resorts.controller';
import { ResortsService } from './resorts.service';
import { Resort } from '../entities/resort.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { Favorite } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Resort, Favorite])],
  controllers: [ResortsController],
  providers: [ResortsService, FavoritesService],
})
export class ResortsModule {}
