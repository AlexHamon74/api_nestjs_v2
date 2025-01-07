import { Dev } from "../../devs/entities/dev.entity";
import { Client } from "../../clients/entities/client.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("project")
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    deadline: Date;

    @Column()
    status: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Client, client => client.projects)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToMany(type => Dev, dev => dev.projects)
    @JoinTable({
        name: "dev_project",
        joinColumn: { name: "project_id"},
        inverseJoinColumn: { name: "dev_id"}
    })
    devs: Dev[];
}
