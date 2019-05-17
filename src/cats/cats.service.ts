import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { catsEntity } from './cats.entity';


@Injectable()
export class CatsService {
    constructor(@InjectRepository(catsEntity) private cats: Repository<catsEntity>) { }
    async findAll(): Promise<Cat[]> {
        return await this.cats.find();
    }
    async findOne(id: number): Promise<Cat> {
        const item = await this.cats.findOne({ id: id })
        if (!item) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return item;
    }

    async deleteOne(id: number): Promise<Cat> {
        const item = await this.cats.findOne({ where: { id } });

        if (!item) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.cats.delete({ id: id });
        return item
    }
    async createNew(createItem: Cat): Promise<Cat> {
        return await this.cats.save(createItem)
    }
    async updateRecord(updateItem: Cat): Promise<Cat> {
        const item = await this.cats.findOne({ id: updateItem.id })
        if (!item) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.cats.update(updateItem.id, updateItem);
        let id = updateItem.id;
        let updatedItem = await this.cats.findOne({ where: { id } });
        return updatedItem
    }

}