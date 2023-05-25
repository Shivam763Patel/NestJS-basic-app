import { IsEmail, IsNotEmpty } from "class-validator"

export class CraeteUserDto{
    @IsNotEmpty()

    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}