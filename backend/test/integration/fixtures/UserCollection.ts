import { User } from "../../../src/model/User.js";

export const userCollectionWithoutGalleries: User[] = [
  {
    email: "demo-user-1@test.com",
    profile: {
      firstName: "Max",
      lastName: "Mustermann",
    },
    role: "standard",
  },
  {
    email: "demo-user-2@test.com",
    profile: {
      firstName: "Petra",
      lastName: "Musterfrau",
    },
    role: "admin",
  },
  {
    email: "demo-user-3@test.com",
    profile: {
      firstName: "James",
      lastName: "Smith",
    },
    role: "standard",
  },
];
