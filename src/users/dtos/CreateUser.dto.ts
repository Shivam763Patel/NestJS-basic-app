import { IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class CraeteUserDto{
    @IsNotEmpty()

    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsNumber()
    age: number;
}