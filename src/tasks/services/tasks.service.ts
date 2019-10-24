import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRespository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRespository) { }

  public async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found: Task = await this.taskRepository.findOne({
      where: { id: id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<UpdateResult> {
    return await this.taskRepository.updateTaskStatus(id, status, user);
  }

  public async deleteTaskById(id: number, user: User): Promise<DeleteResult> {
    return await this.taskRepository.deleteTaskById(id, user);
  }
}
