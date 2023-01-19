import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "text"})
    content: number;
    @Column({type: "text"})
    image: string;
    @Column({type: "varchar", length: 255})
    statusBlog: string;
    @Column()
    user: number;
}