import mongoose, { Schema, InferSchemaType } from "mongoose";

export const gallerySchema = new Schema({
  name: { type: String, required: true },
});

export type Gallery = InferSchemaType<typeof gallerySchema>;

export const galleryModel = mongoose.model("Gallery", gallerySchema);

export type GalleryModel = typeof galleryModel;
