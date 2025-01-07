import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736262815392 implements MigrationInterface {
    name = 'Migration1736262815392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dev_project\` (\`project_id\` int NOT NULL, \`dev_id\` int NOT NULL, INDEX \`IDX_c5ec6a1adb36ee752f403c9360\` (\`project_id\`), INDEX \`IDX_50ebcec6134e2fe711162d0f52\` (\`dev_id\`), PRIMARY KEY (\`project_id\`, \`dev_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dev_project\` ADD CONSTRAINT \`FK_c5ec6a1adb36ee752f403c9360e\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`dev_project\` ADD CONSTRAINT \`FK_50ebcec6134e2fe711162d0f52e\` FOREIGN KEY (\`dev_id\`) REFERENCES \`dev\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dev_project\` DROP FOREIGN KEY \`FK_50ebcec6134e2fe711162d0f52e\``);
        await queryRunner.query(`ALTER TABLE \`dev_project\` DROP FOREIGN KEY \`FK_c5ec6a1adb36ee752f403c9360e\``);
        await queryRunner.query(`DROP INDEX \`IDX_50ebcec6134e2fe711162d0f52\` ON \`dev_project\``);
        await queryRunner.query(`DROP INDEX \`IDX_c5ec6a1adb36ee752f403c9360\` ON \`dev_project\``);
        await queryRunner.query(`DROP TABLE \`dev_project\``);
    }

}
