import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736261400835 implements MigrationInterface {
    name = 'Migration1736261400835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`deadline\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`status\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`firstname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`firstname\``);
        await queryRunner.query(`DROP TABLE \`project\``);
    }

}
