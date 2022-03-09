export interface MessageBody {
  action: Action;
  to: string;
  from: string;
  timestamp: Date;
  data?: any;
  status?: Status
  errorDescribe?: string
}
export enum Status {
  PENDING = "pedding",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  SUCCESS = "success",
  ERROR = "error",
}

export enum Action {
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
  LIST = "list",
  FIND = "find",
  ROLLBACK = "rollback",
}

export class MessageTransfer {
  private action: Action;
  private to: string;
  private from: string;
  private timestamp: Date;
  private data: any;
  private status: string | undefined;
  private errorDescribe?: string

  constructor({ action, from, to, data, status, errorDescribe }: Omit<MessageBody, "timestamp">) {
    this.action = action
    this.to = to
    this.from = from
    this.timestamp = new Date()
    this.data = data
    this.status = status
    this.errorDescribe = errorDescribe

  }

}