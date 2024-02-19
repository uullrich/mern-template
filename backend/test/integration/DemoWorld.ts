import { World, IWorldOptions } from "@cucumber/cucumber";
import { Response } from "./util/requester/HttpRequester.js";
import { UserBuilder } from "./util/builder/UserBuilder.js";
import { User } from "../../src/model/User.js";

export default class DemoWorld extends World {
  public userBuilder: UserBuilder;
  public user: Partial<User> & { _id?: string };
  public response: Response<unknown>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
