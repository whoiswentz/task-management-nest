import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
