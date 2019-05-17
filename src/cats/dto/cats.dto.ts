import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateCats{
    @IsNumber()
    id:number;

    @IsString()
    name:string;

    @IsString()
    age:string;

    @IsString()
    breed:string;
}