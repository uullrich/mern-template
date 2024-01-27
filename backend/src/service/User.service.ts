import Logger from "../util/Logger";
import { ErrorCode } from "../error/ErrorCode";
import { ServiceError } from "../error/ServiceError";
import { User, UserModel, userModel } from "../model/User";

class UserService {
  constructor(private user: UserModel) {}

  public async getUsers(): Promise<User[]> {
    try {
      Logger.info("Fetch all users from MongoDB");
      return await this.user.find();
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not read users from database", undefined, [error]);
    }
  }

  public async getUserById(id: string): Promise<User | undefined> {
    try {
      Logger.info({ message: "Fetch user by id from MongoDB", id });

      const user = await this.user.findById(id);
      if (!user) {
        return;
      }

      return user;
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not read single user from database", { id }, [error]);
    }
  }

  public async createUser(user: User): Promise<string> {
    try {
      Logger.info({ message: "Create user in MongoDB", user });
      const result = await this.user.create(user);
      return result.id as string;
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not create user in database", { ...user }, [error]);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      Logger.info({ message: "Delete user with id from MongoDB", id });
      await this.user.findByIdAndDelete(id);
    } catch (error) {
      throw ServiceError.build(ErrorCode.DATABASE_ERROR, "Could not delete single user from database", { id }, [error]);
    }
  }
}

const userService = new UserService(userModel);
export default userService;
