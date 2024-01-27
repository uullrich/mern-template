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
import { userCollectionWithoutGalleries } from "../fixtures/UserCollection";

Given("the request body contains a(n) valid/invalid email address: {word}", function (this: DemoWorld, email: string) {
  this.userBuilder.withEmail(email);
});

Given("the request body contains a valid first name: {word}", function (this: DemoWorld, firstName: string) {
  this.userBuilder.withFirstName(firstName);
});

Given("the request body contains a valid last name: {word}", function (this: DemoWorld, lastName: string) {
  this.userBuilder.withLastName(lastName);
});

Given("the database contains multiple users", async function (this: DemoWorld) {
  const userCollection = MongoTestHelper.getCollectionByName("users");
  const result = await userCollection.insertMany(userCollectionWithoutGalleries);

  //Remember this user for later processing
  this.user = {
    ...userCollectionWithoutGalleries[1],
    _id: new ObjectId(result.insertedIds[1].id).toString(),
  };
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

When("the get all user endpoint is called", async function (this: DemoWorld) {
  this.response = await UserRequester.getUsers();
});

When("the get user endpoint is called", async function (this: DemoWorld) {
  if (!this.user._id) {
    fail("Missing user id");
  }

  this.response = await UserRequester.getUser(this.user._id);
});

When("the delete user endpoint is called", async function (this: DemoWorld) {
  if (!this.user._id) {
    fail("Missing user id");
  }

  this.response = await UserRequester.deleteUser(this.user._id);
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

Then("all users should be returned", function (this: DemoWorld) {
  const users = this.response.data as User[];

  expect(
    userCollectionWithoutGalleries.every((mockUser) =>
      users.find(
        (user) =>
          user.email === mockUser.email &&
          user.profile?.firstName === mockUser.profile?.firstName &&
          user.profile?.lastName === mockUser.profile?.lastName &&
          user.role === mockUser.role,
      ),
    ),
  ).toBe(true);
});

Then("the specific user should be returned", function (this: DemoWorld) {
  const user = this.response.data;
  expect(user).toEqual({ ...this.user, galleries: [] });
});

Then("the specific user should be deleted in the database", async function (this: DemoWorld) {
  const userCollection = MongoTestHelper.getCollectionByName("users");
  const user = await userCollection.findOne<User>({ _id: new ObjectId(this.user._id) });

  expect(user).toBeNull();
});
