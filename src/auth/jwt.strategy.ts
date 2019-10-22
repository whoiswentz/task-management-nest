import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './repositories/user.repository';
import { JwtPayload } from './models/jwt-payload.model';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mysecret',
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user: User = await this.userRepository.findOne({ username: payload.username });
    if (!user) { throw new UnauthorizedException(); }
    return user;
  }
}
