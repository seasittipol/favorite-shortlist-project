import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserResort1766602707910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "favorites" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "resortId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                CONSTRAINT "PK_favorites_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_favorites_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_favorites_resort" FOREIGN KEY ("resortId") REFERENCES "resorts"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "UQ_favorites_user_resort" UNIQUE ("userId", "resortId")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "favorites"`);
  }
}
