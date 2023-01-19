import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    idBlogTag: number;
    @Column({type: "int"})
    blog: number;
    @Column({type: "int"})
    tag: number;
}

