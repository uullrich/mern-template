import { World, IWorldOptions } from "@cucumber/cucumber";
import { UserBuilder } from "./util/builder/UserBuilder";
import { AxiosResponse } from "axios";

export default class DemoWorld extends World {
  public userBuilder: UserBuilder;
  public response: AxiosResponse;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
