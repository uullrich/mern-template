import { Given, Then, When } from "@cucumber/cucumber";
import DemoWorld from "../DemoWorld";
import { expect } from "expect";
import UserRequester from "../util/requester/UserRequester";

Given("the request body with the valid email address {word}", function (this: DemoWorld, email: string) {
  this.userBuilder.withEmail(email);
});

Given("the request body contains a valid first name: {word}", function (this: DemoWorld, firstName: string) {
  this.userBuilder.withFirstName(firstName);
});

Given("the request body contains a valid last name: {word}", function (this: DemoWorld, lastName: string) {
  this.userBuilder.withLastName(lastName);
});

When("the request is sent to the user creation endpoint", async function (this: DemoWorld) {
  const user = this.userBuilder.build();
  this.response = await UserRequester.createUser(user);
});

Then("the userId of the newly created user is returned", function (this: DemoWorld) {
  expect(this.response.status).toBe(201);

  const data = this.response.data as { id: string };
  expect(data).toBeDefined();
  expect(data.id).toBeDefined();
});

Then("a new user is created in the database", function (this: DemoWorld) {
  //ToDo: Implement
});
