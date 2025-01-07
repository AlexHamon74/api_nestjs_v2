import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736261957594 implements MigrationInterface {
    name = 'Migration1736261957594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`firstname\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_816f608a9acf4a4314c9e1e9c66\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_816f608a9acf4a4314c9e1e9c66\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`clientId\``);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`firstname\` varchar(255) NOT NULL`);
    }

}
