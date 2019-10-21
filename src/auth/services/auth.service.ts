import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {

  constructor(private userRepository: UserRepository) { }

  public async signUp(credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(credentialsDto);
  }

  public async signIn(credentialsDto: AuthCredentialsDto): Promise<string> {
    const username: string = await this.userRepository.validateUserPassword(credentialsDto);
    if (!username) { throw new NotFoundException(`Plase check your credentials`); }
    return username;
  }
}
