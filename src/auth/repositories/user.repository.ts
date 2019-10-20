import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserBuilder } from '../user.builder';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(credentialsDto: AuthCredentialsDto): Promise<void> {
    const username: string = credentialsDto.username;
    const password: string = credentialsDto.password;

    const user: User = new UserBuilder()
      .setUsername(username)
      .setPassword(password)
      .build();
    await user.save();
  }
}
