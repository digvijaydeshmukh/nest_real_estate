import { Controller, Get, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRes } from './userdto/user.dto';
import { ValidationPipe } from 'src/shared/validator.pipe';

import { User } from './user.decorator';
import { AuthGuard } from 'src/shared/auth/auth.service';



@Controller()
export class UserController {

    constructor(private _userService: UserService) { }

    @Get('api/user')
    @UseGuards(new AuthGuard())
    showAllUser(@User() user) {
        console.log(user);
        
        return this._userService.showAllUser()
    }
    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO){

        return this._userService.login(data)
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO) {
        return this._userService.register(data)
    }
}
