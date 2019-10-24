import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../services/tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRespository } from '../repositories/task.repository';

xdescribe('Tasks Controller', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController]
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should TasksController be defined', () => {
    expect(controller).toBeDefined();
  });
});
