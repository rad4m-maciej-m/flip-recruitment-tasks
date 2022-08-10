import { createMicroservice } from 'src/Utils/main';
import { PortPath } from 'src/Utils/port';
import { TasksModule } from './tasks.module';

createMicroservice(PortPath.tasks, TasksModule);
