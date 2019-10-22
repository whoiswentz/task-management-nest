import { createParamDecorator } from '@nestjs/common';
import { User } from './entities/user.entity';

export const GetUser: ParameterDecorator = createParamDecorator((data: any, request: any): User => {
  return request.user;
});
