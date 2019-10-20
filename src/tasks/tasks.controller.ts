import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

  constructor(private tasksServices: TasksService) { }

  @Get()
  public getTasks(@Query(TaskStatusValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksServices.getTasksWithFilters(filterDto);
    }
    return this.tasksServices.getTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  @UsePipes(TaskStatusValidationPipe)
  public updateTask(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.tasksServices.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Date {
    return this.tasksServices.deleteTaskById(id);
  }
}
