import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column({type: "varchar", length: 255})
    first
    @Column({type: "varchar", length: 255})
    @Column({type: "varchar", length: 255})
    email: string;
    @Column({type: "varchar", length: 255})
    password: string;
    @Column({type: "int"})
    age: number;
    @Column({type: "varchar", length: 255})
    status: string;
    @Column()
    role: string;
}