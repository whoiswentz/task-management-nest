import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  public async signUp(credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(credentialsDto);
  }
}
