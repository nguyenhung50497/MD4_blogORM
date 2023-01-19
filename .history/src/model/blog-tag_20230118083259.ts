import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    idBlogTag: number;
    @Column({type: "varchar", length: 255})
    status: string;
    @Column({type: "int"})
    quantity: number;
    @Column({type: "int"})
    blog: number;
    @Column({type: "int"})
    tag: number;
}

