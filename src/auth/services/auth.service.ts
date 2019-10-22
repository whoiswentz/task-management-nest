import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class AuthService {

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  public async signUp(credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(credentialsDto);
  }

  public async signIn(credentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username: string = await this.userRepository.validateUserPassword(credentialsDto);

    if (!username) {
      throw new NotFoundException(`Plase check your credentials`);
    }

    const payload: JwtPayload = {
      username: username,
    };

    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken: accessToken };
  }
}
