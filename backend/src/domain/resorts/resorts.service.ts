import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resort } from '../entities/resort.entity';

@Injectable()
export class ResortsService {
  constructor(
    @InjectRepository(Resort)
    private resortsRepository: Repository<Resort>,
  ) {}

  async findAll(): Promise<Resort[]> {
    return this.resortsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
