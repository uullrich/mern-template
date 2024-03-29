import { AfterAll, Before, BeforeAll, setDefaultTimeout, setWorldConstructor } from "@cucumber/cucumber";
import DemoWorld from "../DemoWorld.js";
import { App } from "../../../src/app.js";
import { fail } from "node:assert";
import { UserBuilder } from "../util/builder/UserBuilder.js";
import MongoTestHelper from "../util/database/MongoTestHelper.js";

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

  await MongoTestHelper.connect();
});

AfterAll(async () => {
  await app.stop(false);
  await MongoTestHelper.disconnect();
});

Before(async function (this: DemoWorld) {
  this.userBuilder = new UserBuilder();

  console.log("Cleanup all collections for next test scenario:");
  await MongoTestHelper.clear();
});
