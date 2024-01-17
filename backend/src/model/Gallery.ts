import mongoose, { Schema, InferSchemaType } from "mongoose";

const gallerySchema = new Schema({
  name: { type: String, required: true },
});

export type Gallery = InferSchemaType<typeof gallerySchema>;

export const GalleryModel = mongoose.model("Gallery", gallerySchema);
