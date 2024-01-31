import { User } from "../../../../src/model/User";
import { RequestConfigBuilder } from "../builder/RequestConfigBuilder";
import AxiosRequester from "./AxiosRequester";
import { HttpRequester, Response } from "./HttpRequester";

export class UserRequester {
  constructor(private httpRequester: HttpRequester) {}

  public async createUser(user: Partial<User>): Promise<Response<{ id: string }>> {
    const request = new RequestConfigBuilder().withMethod("POST").withUrl("/api/user").withRequestBody(user).build();
    return this.httpRequester.sendRequest<{ id: string }>(request);
  }

  public getUsers(): Promise<Response<User[]>> {
    const request = new RequestConfigBuilder().withMethod("GET").withUrl("/api/user").build();
    return this.httpRequester.sendRequest<User[]>(request);
  }

  public getUser(id: string): Promise<Response<User>> {
    const request = new RequestConfigBuilder().withMethod("GET").withUrl(`/api/user/${id}`).build();
    return this.httpRequester.sendRequest<User>(request);
  }

  public deleteUser(id: string): Promise<Response> {
    const request = new RequestConfigBuilder().withMethod("DELETE").withUrl(`/api/user/${id}`).build();
    return this.httpRequester.sendRequest(request);
  }
}

export default new UserRequester(AxiosRequester);
