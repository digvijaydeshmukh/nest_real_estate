import { Controller, Get, Req, Post, HttpCode, Header, Param, Body, Res, HttpStatus, Delete, Put } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCats } from './dto/cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { puts } from 'util';
import { async } from 'rxjs/internal/scheduler/async';
import { DeleteResult, UpdateResult } from 'typeorm';
import { create } from 'domain';
import { createInflateRaw } from 'zlib';


@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    // @Post()
    // async create(@Body() createCatDto: CreateCats) {
    //     console.log(createCatDto);
        
    //     this.catsService.create(createCatDto);
    //     return "item created succefully"
    // }
    @Get()
    async findAll(): Promise<Cat[]> {        
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param ('id') id):Promise<Cat>{
        return this.catsService.findOne(id)
    }
    @Delete(':id')
    deleteOne(@Param('id') id):Promise<DeleteResult>{
        return this.catsService.deleteOne(id)
    }
    @Post()
    createInflateRaw(@Body() createCatDto:CreateCats): Promise<Cat>{
        return this.catsService.createNew(createCatDto)
    }
    @Put(':id')
    updaterecord(@Body() createCatDto:CreateCats,@Param('id') id):Promise<UpdateResult>{
        createCatDto.id=Number(id);
        return this.catsService.updateRecord(createCatDto)
    }

}
