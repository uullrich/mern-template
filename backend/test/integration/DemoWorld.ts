import { World, IWorldOptions } from "@cucumber/cucumber";
import { Response } from "./util/requester/HttpRequester";
import { UserBuilder } from "./util/builder/UserBuilder";
import { User } from "../../src/model/User";

export default class DemoWorld extends World {
  public userBuilder: UserBuilder;
  public user: Partial<User> & { _id?: string };
  public response: Response<unknown>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
