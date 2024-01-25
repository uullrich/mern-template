import { User } from "../../../../src/model/User";
import { RequestConfigBuilder } from "../builder/RequestConfigBuilder";
import Requester, { HttpRequester, Response } from "./HttpRequester";

export class UserRequester {
  constructor(private httpRequester: HttpRequester) {}

  public async createUser(user: Partial<User>): Promise<Response<{ id: string }>> {
    const request = new RequestConfigBuilder().withMethod("POST").withUrl("/api/user").withRequestBody(user).build();
    return this.httpRequester.sendRequest<{ id: string }>(request);
  }
}

export default new UserRequester(Requester);
