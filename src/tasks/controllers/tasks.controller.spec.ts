import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../services/tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRespository } from '../repositories/task.repository';
import { MockTaskRespository } from '../services/tasks.service.spec';

describe('Tasks Controller', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, {
        provide: TaskRespository,
        useClass: MockTaskRespository,
      }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should TasksController be defined', () => {
    expect(controller).toBeDefined();
  });
});
