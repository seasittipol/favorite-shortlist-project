import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponseDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return auth response on successful login', async () => {
      const loginDto: LoginDto = { email: 'test@example.com' };
      const expectedResponse: AuthResponseDto = {
        accessToken: 'jwt-token',
        email: 'test@example.com',
      };

      authService.login.mockResolvedValue(expectedResponse);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should call auth service with correct login dto', async () => {
      const loginDto: LoginDto = { email: 'another@example.com' };
      const expectedResponse: AuthResponseDto = {
        accessToken: 'token',
        email: 'another@example.com',
      };

      authService.login.mockResolvedValue(expectedResponse);

      await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should propagate errors from auth service', async () => {
      const loginDto: LoginDto = { email: 'invalid@example.com' };

      authService.login.mockRejectedValue(new Error('User not found'));

      await expect(controller.login(loginDto)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
