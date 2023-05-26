import { IsNotEmpty } from "class-validator";

export class CraeteTaskDto
{

    id: string;

    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    caption: string;
}