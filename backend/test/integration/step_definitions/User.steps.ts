import { Given, Then, When } from "@cucumber/cucumber";
import DemoWorld from "../DemoWorld";
import HttpRequester from "../util/HttpRequester";
import { RequestConfigBuilder } from "../util/builder/RequestConfigBuilder";
import { expect } from "expect";

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
  const request = new RequestConfigBuilder().withMethod("POST").withUrl("/api/user").withRequestBody(user).build();
  this.response = await HttpRequester.sendRequest<{ id: string }>(request);
});

Then("a new user is created in the database", function (this: DemoWorld) {
  expect(this.response.status).toBe(201);
  expect(this.response.data).toBeDefined();

  const responsePayload = this.response.data as { id: string };
  expect(responsePayload.id).toBeDefined();
});
