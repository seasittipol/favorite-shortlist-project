import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return await this.userRepository.find();
  }

  async create(user: CreateUserDto) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return await this.userRepository.save(user);
  }
}
