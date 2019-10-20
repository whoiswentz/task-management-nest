import { TaskStatus } from './enums/task-status.enum';
import { Task } from './entities/task.entity';

export class TaskBuilder {

  private title: string;
  private description: string;
  private status: TaskStatus;

  public setTitle(title: string): TaskBuilder {
    this.title = title;
    return this;
  }

  public setDescription(description: string): TaskBuilder {
    this.description = description;
    return this;
  }

  public setStatus(status: TaskStatus): TaskBuilder {
    this.status = status;
    return this;
  }

  public build(): Task {
    const task = new Task();
    task.title = this.title;
    task.description = this.description;
    task.status = this.status;
    return task;
  }
}