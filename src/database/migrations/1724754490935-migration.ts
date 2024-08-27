import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724754490935 implements MigrationInterface {
  name = 'Migration1724754490935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "login" ("id" SERIAL NOT NULL, "password" character varying(255) NOT NULL, "user_id" integer, CONSTRAINT "REL_6da2fec3d330c1b6c67c427937" UNIQUE ("user_id"), CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "login" ADD CONSTRAINT "FK_6da2fec3d330c1b6c67c427937e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_6da2fec3d330c1b6c67c427937e"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "login"`);
  }
}
