import { User } from "../../../../src/model/User";

export class UserBuilder {
  private user: Partial<User>;

  constructor() {
    this.user = {};
  }

  public withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  public withFirstName(firstName: string): UserBuilder {
    if (!this.user.profile) {
      this.user.profile = {};
    }

    this.user.profile = {
      ...this.user.profile,
      firstName,
    };
    return this;
  }

  public withLastName(lastName: string): UserBuilder {
    if (!this.user.profile) {
      this.user.profile = {};
    }

    this.user.profile = {
      ...this.user.profile,
      lastName,
    };
    return this;
  }

  public build(): Partial<User> {
    return this.user;
  }
}
