import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot({ ...database.options })],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
