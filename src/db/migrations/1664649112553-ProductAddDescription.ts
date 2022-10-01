import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddDescription1664649112553 implements MigrationInterface {
  name = 'ProductAddDescription1664649112553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
  }
}
