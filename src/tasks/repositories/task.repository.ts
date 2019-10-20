import { Repository, EntityRepository, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskBuilder } from '../task.builder';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const status: string = filterDto.status;
    const search: string = filterDto.search;

    const query: SelectQueryBuilder<Task> = this.createQueryBuilder();
    if (status) { query.andWhere('status = :status', { status: status }); }
    if (search) { query.andWhere('(title LIKE :search OR description LIKE :search)', { search: `%${search}%` }); }
    const tasks: Task[] = await query.getMany();

    return tasks;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const title: string = createTaskDto.title;
    const description: string = createTaskDto.description;

    const task: Task = new TaskBuilder()
      .setTitle(title)
      .setDescription(description)
      .setStatus(TaskStatus.OPEN)
      .build();
    return await task.save();
  }
}
