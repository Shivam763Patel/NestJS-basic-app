import { IsNotEmpty } from "class-validator";
import { TaskStatus  } from "../models/task.model";

export class GetTaskFilterDto
{
    @IsNotEmpty()
    status: TaskStatus;

   @IsNotEmpty()
    search: string;
}