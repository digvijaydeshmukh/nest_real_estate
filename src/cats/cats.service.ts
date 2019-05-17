import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { catsEntity } from './cats.entity';


@Injectable()
export class CatsService {
    constructor(@InjectRepository(catsEntity)private cats:Repository<catsEntity>){
  
    }
    async findAll() :Promise<Cat[]> {    
        return await this.cats.find();
    }
    async findOne(id:number):Promise<Cat>{
        return await this.cats.findOne({id :id})
    }

    async deleteOne(id:number):Promise<DeleteResult>{
        return await this.cats.delete({id: id });
        
    }
    async createNew(createItem:Cat):Promise<Cat>{
        return await this.cats.save(createItem)
    }
    async updateRecord(updateItem:Cat):Promise<UpdateResult>{
        return await this.cats.update(updateItem.id,updateItem)
    }

}