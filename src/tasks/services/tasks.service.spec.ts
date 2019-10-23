import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRespository } from '../repositories/task.repository';
import { TaskBuilder } from '../task.builder';
import { TaskStatus } from '../enums/task-status.enum';
import { Task } from '../entities/task.entity';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, {
        provide: TaskRespository,
        useClass: MockTaskRespository,
      }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all tasks', async () => {
    const filterDto: GetTasksFilterDto = new GetTasksFilterDto();
    // const allTasks: Task[] = await service.getTaks(filterDto);

    // expect(allTasks.length).toEqual(3);
  });
});

export class MockTaskRespository {
  public getTasks(filterDto: GetTasksFilterDto): Task[] {
    return [
      new TaskBuilder().setTitle('Study NestJs').setDescription('10').setStatus(TaskStatus.OPEN).build(),
      new TaskBuilder().setTitle('Study Clojure').setDescription('11').setStatus(TaskStatus.OPEN).build(),
      new TaskBuilder().setTitle('Study Swift').setDescription('12').setStatus(TaskStatus.OPEN).build(),
    ];
  }
}