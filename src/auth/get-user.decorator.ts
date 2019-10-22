import { createParamDecorator } from '@nestjs/common';
import { User } from './entities/user.entity';

export const GetUser: (...dataOrPipes: any[]) => ParameterDecorator =
  createParamDecorator((data: any, request: any): User => {
    return request.user;
  });
