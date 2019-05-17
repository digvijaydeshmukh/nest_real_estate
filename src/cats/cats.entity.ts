import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cats')
export class catsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  age: string;

  @Column({ type: 'varchar', nullable: true })
  breed: string;

}