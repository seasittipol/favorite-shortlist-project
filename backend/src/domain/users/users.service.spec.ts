import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: {
    find: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
  };

  const mockUsers: User[] = [
    {
      id: 1,
      email: 'test1@example.com',
      name: 'Test User 1',
      password: 'hashedPassword1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      email: 'test2@example.com',
      name: 'Test User 2',
      password: 'hashedPassword2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    userRepository = {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(userRepository.find).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      userRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const createUserDto = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password123',
      };
      const savedUser = { ...createUserDto, id: 3 };
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(savedUser);
      expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
    });

    it('should propagate errors from repository', async () => {
      const createUserDto = {
        email: 'existing@example.com',
        name: 'Existing User',
        password: 'password123',
      };
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.save.mockRejectedValue(new Error('Duplicate email'));

      await expect(service.create(createUserDto)).rejects.toThrow(
        'Duplicate email',
      );
    });
  });
});
