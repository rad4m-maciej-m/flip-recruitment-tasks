import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TasksService } from './tasks.services';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @EventPattern('update')
  fetchData(count: number) {
    this.tasksService.updateDb(count);
  }
}
