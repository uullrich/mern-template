import { User } from "../../../../src/model/User.js";

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

  public withRole(role: User["role"]): UserBuilder {
    this.user.role = role;
    return this;
  }

  public build(): Partial<User> {
    return this.user;
  }
}
