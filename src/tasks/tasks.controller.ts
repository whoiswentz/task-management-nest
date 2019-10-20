import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

  constructor(private tasksServices: TasksService) { }

  @Get()
  public getAllTasks(): Task[] {
    return this.tasksServices.allTasks;
  }
}
