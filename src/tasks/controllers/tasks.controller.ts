import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { TaskStatus } from '../enums/task-status.enum';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger: Logger = new Logger('TasksController');

  constructor(private tasksServices: TasksService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  public getTasks(@Query(TaskStatusValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retrieving all tasks`);
    return this.tasksServices.getTasks(filterDto, user);
  }

  @Get('/:id')
  public getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksServices.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User ${user.username} creating tasks`);
    return this.tasksServices.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  @UsePipes(TaskStatusValidationPipe)
  public updateTask(@Param('id', ParseIntPipe) id: number, @Body('status') status: TaskStatus, @GetUser() user: User): Promise<UpdateResult> {
    return this.tasksServices.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<DeleteResult> {
    return this.tasksServices.deleteTaskById(id, user);
  }
}
