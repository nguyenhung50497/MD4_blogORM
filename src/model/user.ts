import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column({type: "varchar", length: 255})
    firstName: string;
    @Column({type: "varchar", length: 255})
    lastName: string;
    @Column({type: "varchar", length: 255})
    username: string;
    @Column({type: "varchar", length: 255})
    password: string;
    @Column({type: "int"})
    age: number;
    @Column({type: "text"})
    avatar: string;
    @Column({type: "varchar", length: 255})
    status: string;
    @Column()
    role: string;
}