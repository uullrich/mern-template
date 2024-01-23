import { AsyncLocalStorage } from "node:async_hooks";

export type RequestStore = {
  requestId: string;
};

const asyncLocalStorage = new AsyncLocalStorage<RequestStore>();
export default asyncLocalStorage;
