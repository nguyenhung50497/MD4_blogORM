import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    idTag: number;
    @Column({type: "varchar", length: 255})
    nameTag: string;
}