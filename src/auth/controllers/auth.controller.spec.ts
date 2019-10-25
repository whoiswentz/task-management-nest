import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { NotFoundException } from '@nestjs/common';

const mockAuthService = jest.fn(() => ({
  signUp: jest.fn().mockResolvedValue(undefined),
  signIn: jest.fn()
    .mockResolvedValueOnce({ accessToken: 'aa' })
    .mockRejectedValueOnce(NotFoundException),
}));

describe('AuthController', () => {
  let controller: AuthController;

  const authCredentialsDto: AuthCredentialsDto = {
    username: 'username',
    password: 'P4ssW0rd!!!@',
  };

  beforeAll(() => {
    mockAuthService.mockClear();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useFactory: mockAuthService,
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should signup successfully', async () => {
      try {
        await controller.signUp(authCredentialsDto);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });

  describe('signin', () => {
    it('should signin successfully', async () => {
      try {
        const token = await controller.signIn(authCredentialsDto);
        expect(token).not.toBeUndefined();
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });

    it('should NOT signin successfully', async () => {
      try {
        const token = await controller.signIn(authCredentialsDto);
        expect(token).toBeUndefined();
        expect(controller.signIn).toThrow(NotFoundException);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
