import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ResortsService } from './resorts.service';
import { Resort } from '../entities/resort.entity';
import { CurrentUser, JwtAuthGuard } from '../auth';
import { User } from '../entities';
import { ResortWithFavoriteResponse } from './dto/resort-with-favorite.response';
import { PaginationMeta } from 'src/common/types/pagination';

@ApiTags('resorts')
@Controller('resorts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResortsController {
  constructor(private readonly resortsService: ResortsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resorts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all resorts',
    type: [Resort],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Number of items per page for pagination',
    type: Number,
  })
  async findAll(
    @CurrentUser() user: User,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
  ): Promise<{ data: ResortWithFavoriteResponse[]; meta: PaginationMeta }> {
    return this.resortsService.findAll(user, page, pageSize);
  }
}
