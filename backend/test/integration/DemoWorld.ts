import { World, IWorldOptions } from "@cucumber/cucumber";
import { Response } from "./util/requester/HttpRequester";
import { UserBuilder } from "./util/builder/UserBuilder";

export default class DemoWorld extends World {
  public userBuilder: UserBuilder;
  public response: Response<unknown>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
