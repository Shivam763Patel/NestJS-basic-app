import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {

    private DummyData = [
        {
        
                username: 'shivam',
                email: 'shivamp@zignuts.com'
            
        },

        {
            username: 'dhruv',
            email: 'dhruv@gmail.com'

        }
    ]

    fetchUsers()
    {
        return this.DummyData;
    }

    newCreateUserNew(userDetails: CreateUserType)
    {
        this.DummyData.push(userDetails)
        return;
    }

    //Fetch user by ID with service where all the logic is written and called in controller
    fetchUserByid(id: number)
    {
        return null;
    }
}


