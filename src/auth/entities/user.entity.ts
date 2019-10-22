import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
