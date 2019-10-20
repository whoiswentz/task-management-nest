import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  get allTasks(): Task[] {
    return this.tasks;
  }
}
