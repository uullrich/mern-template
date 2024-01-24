import { World, IWorldOptions } from "@cucumber/cucumber";

export default class DemoWorld extends World {
  public test: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
