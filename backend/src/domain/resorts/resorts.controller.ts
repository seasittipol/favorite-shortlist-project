import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResortsService } from './resorts.service';
import { Resort } from '../entities/resort.entity';
import { CurrentUser, JwtAuthGuard } from '../auth';
import { User } from '../entities';

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
  async findAll(@CurrentUser() user: User): Promise<Resort[]> {
    return this.resortsService.findAll(user);
  }
}
