import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { request } from 'http';
import { CraeteUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    //Inject Dependency  

    constructor(private userService: UsersService)
    {

    }

//Decorater (method/function) works upon /users which is base URL 
@Get()

//Endpoint like function/method 
getUsers()
{
    return {
        username: 'shivam',
        email: 'shivamp@zignuts.com'
    }
}

@Get('posts')
getUserPosts()
{
    return [
        {
            username: 'yash',
            email: 'yashp@gmail.com',
            posts: [
                {
                    id: 1,
                    title: 'new post one'
                },

                {
                    id: 2,
                    title: 'new post two'
                },
                
                {
                    id: 3,
                    title: 'new post three'
                },



            ],
        },
    ];
}

//Nested Routes 
@Get('posts/comments')

getUserPostsComments()
{
    return{

        id: 1,
        title: 'post 1',
        comments: [

        ]
    }
}

//Create new Post   - users/creatPost
@Post('creatPost')
createUser(@Req() request: Request, @Res() response: Response)
{
    console.log('Req data', request.body);
    response.send('Post created successfully')
}

//Body decorater for Post request body data and type Annotate = Data transfer object (DTO)
@Post('newCreate')
@UsePipes(new ValidationPipe())
newCreateUser(@Body() userData: CraeteUserDto)
{
    console.log('Req body data', userData);
    return userData
}

//Get Post by ID
@Get(':id')

//Endpoint like function/method and IMP: Validator ParseIntPipe
getUserById(@Param('id', ParseIntPipe) id: Number)
{
   //@Req() request: Request, @Res() response: Response
      //console.log('user params data: ',request.params)

    console.log('ID is: ',id);
    return { 
        id
    }
    
};

@Get('posts/data')
getUsersByQuery(@Query('sortBy') sortBy: String)
{
    console.log("User data by query is: ", sortBy)
    return [
        {
            username: 'Pathik',
            email: 'pathik@gmail.com'
        },

        {
            username: 'raju',
            email: 'r@gmail.com'
        }
    ]
}


//With service get DATA of user

@Get('posts/dataNew')
getUsersByQueryDetails()
{
    console.log("User data by query is: ", )
    return this.userService.fetchUsers();
}


//With servie get Data from Body
@Post('newCreateNew')
@UsePipes(new ValidationPipe())
newCreateUserNew(@Body() userData: CraeteUserDto)
{
    console.log('Req body data', userData);
    this.userService.newCreateUserNew(userData)
    return {userData}
}

//With service fetch user by id
@Get('/new/:id')
getUserByidnew(@Param('id', ParseIntPipe) id: number)
{
   const user = this.userService.fetchUserByid(id) 
   if(!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
   return user;
}

}