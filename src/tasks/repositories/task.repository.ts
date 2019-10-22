import { Repository, EntityRepository, QueryBuilder, SelectQueryBuilder, UpdateQueryBuilder, UpdateResult, DeleteResult } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskBuilder } from '../task.builder';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { User } from '../../auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {

  public async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const status: string = filterDto.status;
    const search: string = filterDto.search;

    const query: SelectQueryBuilder<Task> = this.createQueryBuilder();
    query.where('"userId" = :userId', { userId: user.id });
    if (status) { query.andWhere('status = :status', { status: status }); }
    if (search) { query.andWhere('(title LIKE :search OR description LIKE :search)', { search: `%${search}%` }); }
    const tasks: Task[] = await query.getMany();

    return tasks;
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const title: string = createTaskDto.title;
    const description: string = createTaskDto.description;

    const savedTask: Task = await new TaskBuilder()
      .setTitle(title).setDescription(description)
      .setStatus(TaskStatus.OPEN).setUser(user)
      .build().save();

    delete savedTask.user;

    return savedTask;
  }

  public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<UpdateResult> {
    const updatedTaskResult: UpdateResult = await this.update({ id: id, userId: user.id }, { status: status });

    if (!updatedTaskResult.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTaskResult;
  }

  public async deleteTaskById(id: number, user: User): Promise<DeleteResult> {
    const deleteTaskResult: DeleteResult = await this.delete({ id: id, userId: user.id });

    if (!deleteTaskResult.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return deleteTaskResult;
  }
}
