import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUserMockUp1766719976547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "users" ("name", "email", "password")
            VALUES ('User', 'user@example.com', 'password'),
                   ('User2', 'user2@example.com', 'password'),
                   ('User3', 'user3@example.com', 'password'),
                   ('User4', 'user4@example.com', 'password'),
                   ('User5', 'user5@example.com', 'password');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "users"
            WHERE "email" IN ('user@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com');
        `);
  }
}
