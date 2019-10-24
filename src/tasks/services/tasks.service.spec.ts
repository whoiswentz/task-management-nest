import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRespository } from '../repositories/task.repository';
import { TaskBuilder } from '../task.builder';
import { TaskStatus } from '../enums/task-status.enum';
import { Task } from '../entities/task.entity';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { User } from '../../auth/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';

const mockedUser = {
  id: 1,
  username: 'aaaa',
  password: 'aaaaa',
  salt: 'aaaaaa',
  tasks: [],
} as User;

export const mockTaskRespository = () => ({
  getTasks: jest.fn().mockResolvedValue([
    new TaskBuilder().setTitle('Study NestJs').setDescription('10').setStatus(TaskStatus.OPEN).setUser(mockedUser).build(),
    new TaskBuilder().setTitle('Study Clojure').setDescription('11').setStatus(TaskStatus.OPEN).setUser(mockedUser).build(),
    new TaskBuilder().setTitle('Study Swift').setDescription('12').setStatus(TaskStatus.OPEN).setUser(mockedUser).build(),
  ]),

  findOne: jest.fn()
    .mockResolvedValueOnce(
      new TaskBuilder().setTitle('Study NestJs').setDescription('10').setStatus(TaskStatus.OPEN).setUser(mockedUser).build())
    .mockResolvedValueOnce(null),

  createTask: jest.fn()
    .mockResolvedValueOnce(new TaskBuilder().setTitle('Study NestJs').setDescription('10').setStatus(TaskStatus.OPEN).setUser(mockedUser).build()),
});

describe('TasksService', () => {
  let taskService: TasksService;
  let taskRespository: TaskRespository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRespository, useFactory: mockTaskRespository },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRespository = module.get<TaskRespository>(TaskRespository);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(taskRespository).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should get all tasks', async () => {
      const mockedFilterDto: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS };
      const result: Task[] = await taskService.getTasks(mockedFilterDto, mockedUser);
      expect(taskRespository.getTasks).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(3);
    });
  });

  describe('getTaskById', () => {
    const mockedTask: Task = new TaskBuilder()
      .setTitle('Study NestJs')
      .setDescription('10')
      .setStatus(TaskStatus.OPEN)
      .setUser(mockedUser)
      .build();

    it('should return found task', async () => {
      try {
        const task: Task = await taskService.getTaskById(1, mockedUser);
        expect(taskRespository.findOne).toBeCalledWith({ where: { id: 1, userId: mockedUser.id } });
        expect(task).toBeDefined();
        expect(task).toEqual(mockedTask);
        expect(task).toBeInstanceOf(Task);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });

    it('should throw error if not found the task', async () => {
      try {
        const task: Task = await taskService.getTaskById(1, mockedUser);
        expect(taskRespository.findOne).toBeCalledWith({ where: { id: 1, userId: mockedUser.id } });
        expect(task).toBeUndefined();
        expect(task).not.toEqual(mockedTask);
        expect(taskService.getTaskById).rejects.toThrow(NotFoundException);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('createTask', () => {
    const mockedTask: Task = new TaskBuilder()
      .setTitle('Study NestJs')
      .setDescription('10')
      .setStatus(TaskStatus.OPEN)
      .setUser(mockedUser)
      .build();

    it('should create task', async () => {
      const createDto: CreateTaskDto = { title: 'Study NestJs', description: '10' };
      try {
        const task: Task = await taskService.createTask(createDto, mockedUser);
        expect(task).toBeDefined();
        expect(task).toEqual(mockedTask);
        expect(task).toBeInstanceOf(Task);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});
