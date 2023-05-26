import { Injectable } from '@nestjs/common';
import { CraeteTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { GetTaskFilterDto } from 'src/tasks/dtos/get-tasks-filter.dto';
import { Task, TaskStatus } from 'src/tasks/models/task.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class TasksService {

    private tasks: Task[] = []

    getAllTasks(): Task[]
    {
        return this.tasks;
    }

    //Search and filter
    getTaskwithFilters(filterDto: GetTaskFilterDto): Task[]
    {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        //1st: For Status
        if(status)
        {
            tasks = tasks.filter(task => task.status === status)
        }

        //2nd: For search
        if(search)
        {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||  task.caption.includes(search),
                
                );
        }
        return tasks;
    }

    createTask(CraeteTaskDto: CraeteTaskDto): Task
    {
        const { title,caption } = CraeteTaskDto 
        let myuuid = uuidv4();
        const task: Task = 
        {

            title,
            caption,
            status: TaskStatus.OPEN,
            id: myuuid
        }

        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task
    {
        return this.tasks.find(task => task.id === id)
    }

    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(task => task.id !=id)
    }

    //Update task
    updateTaskStatus(id: string, status: TaskStatus)
    {
            const task = this.getTaskById(id)
            task.status = status;
            return task;
    }


}
