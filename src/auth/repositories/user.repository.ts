import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserBuilder } from '../user.builder';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export enum DatabaseError {
  UNIQUE_VIOLATION = '23505',
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username: string = authCredentialsDto.username;
    const password: string = authCredentialsDto.password;

    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await this.hashPassword(password, salt);

    const user: User = new UserBuilder()
      .setUsername(username)
      .setPassword(hashedPassword)
      .setSalt(salt)
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

  public async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const username: string = authCredentialsDto.username;
    const password: string = authCredentialsDto.password;

    const user: User = await this.findOne({ username: username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    }

    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
