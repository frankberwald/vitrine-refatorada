import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm"
import { Role } from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200})
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({name: "user_roles"})
    roles: Role[]
}