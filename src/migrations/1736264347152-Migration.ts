import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736264347152 implements MigrationInterface {
    name = 'Migration1736264347152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`firstname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`firstname\``);
    }

}
