import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus  } from "../models/task.model";

export class GetTaskFilterDto
{
  
    id: string

    @IsNotEmpty()
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE] )
    status: TaskStatus;

   @IsNotEmpty()
   @IsOptional()
    search: string;
}