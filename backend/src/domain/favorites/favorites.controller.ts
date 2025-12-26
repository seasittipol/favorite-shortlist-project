import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth';
import { User } from '../entities';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a resort to favorites' })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiResponse({
    status: 201,
    description: 'Favorite created successfully',
    type: Favorite,
  })
  @ApiResponse({
    status: 409,
    description: 'Resort is already in favorites',
  })
  async create(
    @CurrentUser() user: User,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<Favorite> {
    createFavoriteDto.userId = user.id;
    return this.favoritesService.create(createFavoriteDto);
  }

  @Delete(':resortId')
  @ApiOperation({ summary: 'Remove a favorite by ID' })
  @ApiParam({ name: 'resortId', description: 'Resort ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'Favorite deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Favorite not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() user: User,
    @Param('resortId') resortId: number,
  ): Promise<void> {
    return this.favoritesService.remove(user.id, resortId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Returns all favorites with user and resort details',
    type: [Favorite],
  })
  async findAll(): Promise<Favorite[]> {
    return this.favoritesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get favorites by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns all favorites for the specified user',
    type: [Favorite],
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Favorite[]> {
    return this.favoritesService.findByUserId(userId);
  }
}
