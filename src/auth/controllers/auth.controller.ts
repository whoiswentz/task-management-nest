import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/signup')
  public async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  public async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
