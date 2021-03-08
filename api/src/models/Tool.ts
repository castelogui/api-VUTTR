import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v1 as uuid } from "uuid";

@Entity("tools")
class Tool {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Tool };
