import {Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import {User} from "./User"
import { OneToOne } from "typeorm";

@Entity('medicamentos')

export class Medicamento{
@PrimaryGeneratedColumn('increment')
id: number;

@Column('varchar',{length:255,nullable:false})

nome: string;
@Column('text',{nullable:true})

descrição: string;

@Column('integer',{nullable:false})
quantidade: number;

@OneToOne(()=> User)
@JoinColumn()
user: User;


}