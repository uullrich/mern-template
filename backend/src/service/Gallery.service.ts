import Logger from "../util/Logger";
import { ErrorCode } from "../error/ErrorCode";
import { ServiceError } from "../error/ServiceError";
import { Gallery } from "../model/Gallery";
import { UserModel, userModel } from "../model/User";

class GalleryService {
  constructor(private user: UserModel) {}

  public async getGalleries(userId: string): Promise<Gallery[] | undefined> {
    try {
      Logger.info({ message: "Fetch all galleries for user in MongoDB", userId });
      const user = await this.user.findById(userId);
      return user?.galleries || undefined;
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not read galleries from database", undefined, [error]);
    }
  }

  public async getGalleryById(userId: string, galleryId: string): Promise<Gallery | undefined> {
    try {
      Logger.info({ message: "Fetch specific gallery from user in MongoDB", userId, galleryId });
      const user = await this.user.findById(userId);
      const gallery = user?.galleries?.id(galleryId);
      if (!gallery) {
        return;
      }

      return gallery;
    } catch (error) {
      throw ServiceError.build(
        ErrorCode.DATABASE_ERROR,
        "Could not read single gallery from database",
        { userId, galleryId },
        [error],
      );
    }
  }

  public async createGallery(userId: string, gallery: Gallery): Promise<string | undefined> {
    try {
      Logger.info({ message: "Create gallery for user in MongoDB", userId, gallery });
      const user = await this.user.findById(userId);
      if (!user?.galleries) {
        return;
      }

      user.galleries.push(gallery);
      const saveResult = await user.save();

      const newlyCreatedGalleryId = saveResult.galleries?.[user.galleries.length - 1].id as string;
      return newlyCreatedGalleryId;
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not create gallery in database", { ...gallery }, [
        error,
      ]);
    }
  }

  public async deleteGallery(userId: string, galleryId: string): Promise<void> {
    try {
      Logger.info({ message: "Delete gallery for user in MongoDB", userId, galleryId });
      const user = await this.user.findById(userId);
      if (!user?.galleries) {
        return;
      }

      user.galleries.id(galleryId)?.deleteOne();

      await user.save();
    } catch (error) {
      throw ServiceError.build(
        ErrorCode.DATABASE_ERROR,
        "Could not delete single gallery from database",
        { userId, galleryId },
        [error],
      );
    }
  }
}

const galleryService = new GalleryService(userModel);
export default galleryService;
