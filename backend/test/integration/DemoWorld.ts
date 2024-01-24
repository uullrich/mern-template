import { World, IWorldOptions } from "@cucumber/cucumber";

export default class FacadeWorld extends World {
  public test: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
