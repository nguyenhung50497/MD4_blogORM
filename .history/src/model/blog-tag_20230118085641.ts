import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    idBlogTag: number;
    @Column({type: "int"})
    blog: number;
    @Column({type: "int"})
    tag: number;
}

