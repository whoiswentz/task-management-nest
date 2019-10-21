import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserBuilder } from '../user.builder';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export enum DatabaseError {
  UNIQUE_VIOLATION = '23505',
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(credentialsDto: AuthCredentialsDto): Promise<void> {
    const username: string = credentialsDto.username;
    const password: string = credentialsDto.password;

    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await this.hashPassword(password, salt);

    const user: User = new UserBuilder()
      .setUsername(username)
      .setSalt(salt)
      .setPassword(hashedPassword)
      .build();

    try {
      await user.save();
    } catch (error) {
      if (error.code === DatabaseError.UNIQUE_VIOLATION) {
        throw new ConflictException('Username already existis');
      }
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
