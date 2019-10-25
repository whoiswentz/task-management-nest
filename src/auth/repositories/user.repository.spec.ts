import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { SinonSandbox, createSandbox, createStubInstance, SinonStubbedInstance } from 'sinon';
import * as typeorm from 'typeorm';

xdescribe('UserRepository', () => {
  let entityManager: SinonStubbedInstance<typeorm.EntityManager>;
  let userRepository: UserRepository;

  const authCredentialsDto: AuthCredentialsDto = {
    username: 'username',
    password: 'P4ssW0rd!!!@',
  };

  beforeEach(async () => {
    entityManager = createStubInstance(typeorm.EntityManager)

    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  xdescribe('signup', () => {
    it('should signup user successfully', async () => {
      entityManager.save.resolves(undefined);
      await userRepository.signUp(authCredentialsDto);
      expect(userRepository.signUp).rejects.not.toThrow();
    });
  });
});
