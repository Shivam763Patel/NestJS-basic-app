import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CraeteTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { GetTaskFilterDto } from 'src/tasks/dtos/get-tasks-filter.dto';
import { Task, TaskStatus } from 'src/tasks/models/task.model';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor (private tasksService: TasksService)
    {

    }

    @Get('data')
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[]
    {   
        if(Object.keys(filterDto).length)
        {
            return this.tasksService.getTaskwithFilters(filterDto);

        }

        else{
            return this.tasksService.getAllTasks();

        }
        // return this.tasksService.getAllTasks()
    }

    @Post('/add')
    @UsePipes(new ValidationPipe())
    createTask(

        @Body() CraeteTaskDto: CraeteTaskDto
        // @Body('id') id: string,
        // @Body('title') title: string,
        // @Body('caption') caption: string,
         ):
        Task{
            return this.tasksService.createTask(CraeteTaskDto)
        }

    @Get('new/:id')
    getTaskById(@Param('id') id: string): Task
    {
        return this.tasksService.getTaskById(id)
    }

    @Delete('delete/:id')
    deleteTask(@Param('id') id:string): void
    {
        this.tasksService.deleteTask(id)
    }

    //Update task
    @Patch('update/status/:id')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus

    )
    {
        return this.tasksService.updateTaskStatus(id,status)
    }

}
