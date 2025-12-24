import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResortsService } from './resorts.service';
import { Resort } from '../entities/resort.entity';

@ApiTags('resorts')
@Controller('resorts')
export class ResortsController {
  constructor(private readonly resortsService: ResortsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resorts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all resorts',
    type: [Resort],
  })
  async findAll(): Promise<Resort[]> {
    return this.resortsService.findAll();
  }
}
