import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("client")
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    email: string;

}
