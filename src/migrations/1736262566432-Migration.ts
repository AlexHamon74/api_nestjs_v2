import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736262566432 implements MigrationInterface {
    name = 'Migration1736262566432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dev\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`experience_level\` enum ('1', '2', '3') NOT NULL, \`status\` enum ('employee', 'freelancer') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`dev\``);
    }

}
