import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../enums/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata): any {
    switch (metadata.data) {
      case 'status':
        const status: string = value.toUpperCase();
        if (!this.isValidStatus(status)) {
          throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
      default:
        return value;
    }
  }

  private isValidStatus(value: string): boolean {
    return Object.values(TaskStatus).includes(TaskStatus[value]);
  }
}
