import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTools1615160171677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tools",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "link",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "tags",
            type: "varchar",
            isArray: true,
          },
          {
            name: "created_at",
            type: "timestemp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tools");
  }
}
