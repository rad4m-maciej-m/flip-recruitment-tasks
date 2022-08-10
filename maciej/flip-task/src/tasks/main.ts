import { createMicroservice } from '~/utils';
import { TasksModule } from './tasks.module';

createMicroservice(TasksModule, 'tasks');
