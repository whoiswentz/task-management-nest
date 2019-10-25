import { Test } from '@nestjs/testing';
import { UserRepository } from '../../auth/repositories/user.repository';
import { User } from '../../auth/entities/user.entity';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';

describe('TaskRepository Test', () => {
  let userRepository: UserRepository;

  const authCredentialsDto: AuthCredentialsDto = {
    username: 'username',
    password: 'passW0rd!!',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({ providers: [UserRepository] }).compile();
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('Signup', () => {
    it('successfully signs up the user', async () => {
      jest.spyOn(User, 'save').mockResolvedValue(undefined);
      await userRepository.signUp(authCredentialsDto);
      expect(userRepository.signUp).resolves.not.toThrow();
    });
  });
});
