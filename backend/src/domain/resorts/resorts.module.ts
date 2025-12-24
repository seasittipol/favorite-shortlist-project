import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResortsController } from './resorts.controller';
import { ResortsService } from './resorts.service';
import { Resort } from '../entities/resort.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resort])],
  controllers: [ResortsController],
  providers: [ResortsService],
})
export class ResortsModule {}
