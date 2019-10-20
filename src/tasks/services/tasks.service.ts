import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRespository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRespository)
    private taskRepository: TaskRespository,
  ) { }

  public async getTaks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }

  public async getTaskById(id: number): Promise<Task> {
    const found: Task = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<UpdateResult> {
    const updatedTaskResult: UpdateResult = await this.taskRepository.update(id, {status: status});
    if (!updatedTaskResult.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTaskResult;
  }

  public async deleteTaskById(id: number): Promise<DeleteResult> {
    const deleteResult: DeleteResult = await this.taskRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return deleteResult;
  }
}
