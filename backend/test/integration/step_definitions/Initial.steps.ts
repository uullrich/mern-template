import { AfterAll, Before, BeforeAll, setDefaultTimeout, setWorldConstructor } from "@cucumber/cucumber";
import DemoWorld from "../DemoWorld";
import { App } from "../../../src/app";
import { fail } from "node:assert";
import { UserBuilder } from "../util/builder/UserBuilder";

setDefaultTimeout(10_000);
setWorldConstructor(DemoWorld);

let app: App;

BeforeAll(async () => {
  app = new App();
  try {
    await app.start();
  } catch (error) {
    console.log(error);
    fail("Could not start application for test");
  }
});

AfterAll(async () => {
  await app.stop(false);
});

Before(function (this: DemoWorld) {
  this.userBuilder = new UserBuilder();
});
