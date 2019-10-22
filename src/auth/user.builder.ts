import { User } from './entities/user.entity';

export class UserBuilder {
  private username: string;
  private password: string;
  private salt: string;

  public setUsername(username: string): UserBuilder {
    this.username = username;
    return this;
  }

  public setPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  public setSalt(salt: string): UserBuilder {
    this.salt = salt;
    return this;
  }

  public build(): User {
    const user: User = new User();
    user.username = this.username;
    user.password = this.password;
    user.salt = this.salt;
    return user;
  }
}
