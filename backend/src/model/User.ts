import mongoose, { Schema, InferSchemaType } from "mongoose";
import { gallerySchema } from "./Gallery.js";

export const userSchema = new Schema({
  profile: {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
  },
  role: { type: String, enum: ["admin", "standard"], required: false, default: "standard" },
  email: { type: String, required: true },
  galleries: { type: [gallerySchema], required: false },
});

export type User = InferSchemaType<typeof userSchema>;

export const userModel = mongoose.model("User", userSchema);

export type UserModel = typeof userModel;
