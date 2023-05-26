import { Module } from '@nestjs/common';
import { TasksController } from './conrtollers/tasks/tasks.controller';
import { TasksService } from './services/tasks/tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
