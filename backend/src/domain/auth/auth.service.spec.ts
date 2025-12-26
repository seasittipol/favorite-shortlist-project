import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const loginDto = { email: 'test@example.com' };

    it('should return access token and email when user exists', async () => {
      const expectedToken = 'jwt-token';
      userRepository.findOne.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValue(expectedToken);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        accessToken: expectedToken,
        email: mockUser.email,
      });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        email: mockUser.email,
        id: mockUser.id,
      });
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(service.login(loginDto)).rejects.toThrow('User not found');
    });

    it('should call findOne with correct email', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValue('token');

      await service.login({ email: 'another@example.com' });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'another@example.com' },
      });
    });
  });
});
