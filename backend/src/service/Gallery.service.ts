import { ErrorCode } from "../error/ErrorCode";
import { ServiceError } from "../error/ServiceError";
import { Gallery, GalleryModel, galleryModel } from "../model/Gallery";

class GalleryService {
  constructor(private gallery: GalleryModel) {}

  public async getGalleries(): Promise<Gallery[]> {
    try {
      return await this.gallery.find();
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not read galleries from database", undefined, [error]);
    }
  }

  public async getGalleryById(id: string): Promise<Gallery | undefined> {
    try {
      const gallery = await this.gallery.findById(id);
      if (!gallery) {
        return;
      }

      return gallery;
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not read single gallery from database", { id }, [
        error,
      ]);
    }
  }

  public async createGallery(gallery: Gallery): Promise<string> {
    try {
      const result = await this.gallery.create(gallery);
      return result.id as string;
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not create gallery in database", { ...gallery }, [
        error,
      ]);
    }
  }

  public async deleteGallery(id: string): Promise<void> {
    try {
      await this.gallery.findByIdAndDelete(id);
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not delete single gallery from database", { id }, [
        error,
      ]);
    }
  }
}

const galleryService = new GalleryService(galleryModel);
export default galleryService;
