import { TasksService } from './tasks.service';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @EventPattern('fetch-data')
  fetchData(count: number) {
    this.tasksService.updateDatabase(count);
  }
}
