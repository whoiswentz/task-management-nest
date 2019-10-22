import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { TaskStatus } from '../enums/task-status.enum';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServices: TasksService) { }

  @Get()
  public getTasks(@Query(TaskStatusValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksServices.getTaks(filterDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  @UsePipes(TaskStatusValidationPipe)
  public updateTask(@Param('id', ParseIntPipe) id: number, @Body('status') status: TaskStatus): Promise<UpdateResult> {
    return this.tasksServices.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.tasksServices.deleteTaskById(id);
  }
}
