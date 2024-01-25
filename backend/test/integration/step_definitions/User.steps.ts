import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";
import { ObjectId } from "mongodb";
import DemoWorld from "../DemoWorld";
import UserRequester from "../util/requester/UserRequester";
import MongoTestHelper from "../util/database/MongoTestHelper";
import { User } from "../../../src/model/User";

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
  this.user = this.userBuilder.build();
  this.response = await UserRequester.createUser(this.user);
});

Then("the userId of the newly created user is returned", function (this: DemoWorld) {
  expect(this.response.status).toBe(201);

  const data = this.response.data as { id: string };
  expect(data).toBeDefined();
  expect(data.id).toBeDefined();
});

Then("a new user is created in the database", async function (this: DemoWorld) {
  if (!this.user?.profile) {
    fail("Missing assertion profile");
  }

  const { id } = this.response.data as { id: string };
  const userCollection = MongoTestHelper.getCollectionByName("users");
  const user = await userCollection.findOne<User>({ _id: new ObjectId(id) });

  expect(user).toBeDefined();
  expect(user?.email).toEqual(this.user.email);
  expect(user?.role).toEqual("standard");
  expect(user?.profile).toBeDefined();

  const { firstName, lastName } = this.user.profile;
  expect(user?.profile).toEqual({
    firstName,
    lastName,
  });
});
