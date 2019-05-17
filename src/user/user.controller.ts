import { Controller, Get, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRes } from './userdto/user.dto';
import { ValidationPipe } from 'src/shared/validator.pipe';
import { AuthGuard } from 'src/shared/auth.gaurd';

@Controller('user')
export class UserController {

    constructor(private _userService: UserService) { }

    @Get('allusers')
    @UseGuards(new AuthGuard())
    showAllUser(): Promise<UserRes[]> {
        return this._userService.showAllUser()
    }
    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO): Promise<UserRes> {

        return this._userService.login(data)
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO): Promise<UserRes> {
        return this._userService.register(data)
    }
}
