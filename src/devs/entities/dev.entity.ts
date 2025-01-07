import { Project } from "../../projects/entities/project.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('dev')
export class Dev {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['1', '2', '3'],
    })
    experience_level: string;

    @Column({
        type: 'enum',
        enum: ['employee', 'freelancer'],
    })
    status: string;

    @ManyToMany(type => Project, project => project.devs)
    projects: Project[];
}
