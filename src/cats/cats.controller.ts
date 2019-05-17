import { Controller, Get, Req, Post, HttpCode, Header, Param, Body, Res, HttpStatus, Delete, Put, UsePipes, Logger } from '@nestjs/common';
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
import { ValidationPipe } from 'src/shared/validator.pipe';


@Controller('cats')
export class CatsController {
    private logger=new Logger('CatsController');
    constructor(private readonly catsService: CatsService) { }
    @Get()
    async findAll(): Promise<Cat[]> {        
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param ('id') id):Promise<Cat>{
        return this.catsService.findOne(id)
    }
    @Delete(':id')
    deleteOne(@Param('id') id):Promise<Cat>{
        return this.catsService.deleteOne(id)
    }

    @Post()
    @UsePipes(new ValidationPipe)
    createInflateRaw(@Body() createCatDto:CreateCats): Promise<Cat>{
        this.logger.log(JSON.stringify(createCatDto))
        return this.catsService.createNew(createCatDto)
    }
    @Put(':id')
    @UsePipes(new ValidationPipe)
    updaterecord(@Body() createCatDto:CreateCats,@Param('id') id):Promise<Cat>{
        createCatDto.id=Number(id);
        this.logger.log(JSON.stringify(createCatDto))
        return this.catsService.updateRecord(createCatDto)
    }

}
