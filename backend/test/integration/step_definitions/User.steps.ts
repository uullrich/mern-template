import { Given, Then, When } from "@cucumber/cucumber";
import DemoWorld from "../DemoWorld";

Given("a request body with the valid email address test@test.com", function (this: DemoWorld) {
  this.test = "123";
  console.log("Hello world");
});

Given("the request body contains a valid profile", function (this: DemoWorld) {
  console.log("Hello world 2", this.test);
});

When("the request is sent to the user creation endpoint", function (this: DemoWorld) {
  console.log("Hello world 3");
});

Then("a new user is created in the database", function (this: DemoWorld) {
  console.log("Hello world 4");
});
