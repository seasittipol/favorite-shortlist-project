import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from '../entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: {
    findAll: jest.Mock;
    create: jest.Mock;
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
    userService = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
      expect(userService.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      userService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

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
      userService.create.mockResolvedValue(savedUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(savedUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should propagate errors from user service', async () => {
      const createUserDto = {
        email: 'existing@example.com',
        name: 'Existing User',
        password: 'password123',
      };
      userService.create.mockRejectedValue(new Error('Duplicate email'));

      await expect(controller.create(createUserDto)).rejects.toThrow(
        'Duplicate email',
      );
    });
  });
});
