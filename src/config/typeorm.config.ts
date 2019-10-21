import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'taskapi',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
