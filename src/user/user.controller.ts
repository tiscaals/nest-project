import { Body, Param, Controller, Get, Post, Patch, Delete, Next, Headers, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUsername, updatePassword } from './user-dto/updateUser.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService){}

    //Get all user
    @Get()
    @Roles('admin')
    getAll(): any{
        return this.userService.getAll()
    }

    @Get(':id')
    getUserById(@Param('id') id:number): any{
        return this.userService.getUserById(id)
    }

    //Create user customer
    @Post()
    createUser(@Body() createUser: any): any{
        return this.userService.createUser(createUser);
    } 

    //Update username
    @Patch('username/:id')
    updateUsername(@Body() updateUser: updateUsername, @Param('id') id: number): any{
        return this.userService.updateUsername(updateUser, id)
    }

    //Update password
    @Patch('password/:id')
    updatePassword(@Body() updateUser: updatePassword, @Param('id') id: number): any{
        return this.userService.updatePassword(updateUser, id)
    }

    //Delete user customer
    @Delete(':id')
    deleteUser(@Param('id') id:number): any{
        return this.userService.deleteUser(id)
    }
}