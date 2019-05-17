import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRes } from './userdto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {

    }
    async showAllUser() :Promise<UserRes[]> {
        console.log("test",await this.userRepo.find());
        
        const user = await this.userRepo.find();
        return user.map(user => user.toResponseObject(false))
    }
    async login(data: UserDTO):Promise<UserRes> {
        const { username, password } = data;
        const user = await this.userRepo.findOne({ where: { username } })

        if(!user || !(await user.comparePassword(password))){
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
              );
        }
        return user.toResponseObject();
    }
    async register(data:UserDTO):Promise<UserRes> { 
        const { username }=data;
        let user=await this.userRepo.findOne({where : {username}})

        if(user){
            throw new HttpException("user aleary exist",HttpStatus.BAD_REQUEST)
        }

        user=await this.userRepo.create(data);
        await this.userRepo.save(user)
        return user.toResponseObject();

    }
}
