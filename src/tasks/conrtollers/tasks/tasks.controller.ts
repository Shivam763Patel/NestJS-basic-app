import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CraeteTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { GetTaskFilterDto } from 'src/tasks/dtos/get-tasks-filter.dto';
import { Task, TaskStatus } from 'src/tasks/models/task.model';
import { TaskStatusValidation } from 'src/tasks/pipes/task-status-validation.pipe';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor (private tasksService: TasksService)
    {

    }

    @Get('data')
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[]
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
    @UsePipes(ValidationPipe)
    createTask( @Body() CraeteTaskDto: CraeteTaskDto
        // @Body('id') id: string,
        // @Body('title') title: string,
        // @Body('caption') caption: string,
         ):
        Task{
            return this.tasksService.createTask(CraeteTaskDto)
        }

    @Get('data/:id')
    getTaskById(@Param('id') id: string): Task
    {
     
        const found = this.tasksService.getTaskById(id)

        if(!found)
        {
            console.log("task with id ",id)
            throw new NotFoundException(`Task with ID "${ id }" is not found`);

        }

        return found
    }

    @Delete('delete/:id')
    deleteTask(@Param('id') id: string)
    {
        console.log("User delete task data",id)

        const newdata = this.tasksService.deleteTask(id)
        console.log("Task data one",newdata)

        if(!newdata)
        
        {
            throw new HttpException('Task not found', HttpStatus.BAD_REQUEST)  
        }

        return newdata
    }

    //Update task
    @Patch('update/status/:id')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidation) status: TaskStatus

    )
    {
        return this.tasksService.updateTaskStatus(id,status)
    }

}
