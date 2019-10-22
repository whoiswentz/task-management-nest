import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRespository } from './repositories/task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([TaskRespository]),
    AuthModule,
  ],
})
export class TasksModule { }
