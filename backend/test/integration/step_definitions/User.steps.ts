import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";
import { ObjectId } from "mongodb";
import { AxiosError } from "axios";
import DemoWorld from "../DemoWorld";
import UserRequester from "../util/requester/UserRequester";
import MongoTestHelper from "../util/database/MongoTestHelper";
import { User } from "../../../src/model/User";
import { Response } from "../util/requester/HttpRequester";
import { ErrorCode } from "../../../src/error/ErrorCode";

Given("the request body contains a(n) valid/invalid email address: {word}", function (this: DemoWorld, email: string) {
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

  try {
    this.response = await UserRequester.createUser(this.user);
  } catch (error) {
    const axiosError = error as AxiosError;
    this.response = axiosError.response as Response<unknown>;
  }
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

Then("the response contains an email address validation error", function (this: DemoWorld) {
  const validationErrorResponse = this.response.data;

  expect(validationErrorResponse).toBeDefined();
  expect(validationErrorResponse).toEqual({
    errorCode: ErrorCode.VALIDATION_ERROR,
    message: "Validation error",
    details: [
      {
        field: "body, email",
        message: '"body.email" must be a valid email',
      },
    ],
  });
});

Then("no user is created in the database", async function (this: DemoWorld) {
  const userCollection = MongoTestHelper.getCollectionByName("users");
  const users = await userCollection.find<User>({}).toArray();
  expect(users.length).toBe(0);
});
