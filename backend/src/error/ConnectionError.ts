import { ConnectionType } from "../connector/ConnectionType.js";
import { ErrorCode } from "./ErrorCode.js";

export class ConnectionError extends Error {
  public static build(
    connectionType: ConnectionType,
    errorCode: ErrorCode,
    message: string,
    details?: Record<string, unknown>,
    childErrors?: Error[],
  ): ConnectionError {
    return new ConnectionError(connectionType, errorCode, message, details, childErrors);
  }

  private constructor(
    public connectionType: ConnectionType,
    public errorCode: ErrorCode,
    public message: string,
    public details?: Record<string, unknown>,
    public childErrors?: Error[],
  ) {
    super();
  }
}
