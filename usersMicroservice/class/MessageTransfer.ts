export interface MessageBody {
  action: Action;
  to: string;
  from: string;
  timestamp: Date;
  data?: any;
}

export enum Action {
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
  LIST = "list",
  FIND = "find",
  ROLLBACK = "rollback",
  CREATED = "created",
  DELETED = "deleted",
  UPDATED = "updated",
  LISTED = "listed",
  FOUND = "found",
  FAILED = "failed",
  ROLLBACKSUCCESS = "rollback:success",
  ROLLBACKFAILED = "rollback:failed"
}

export class MessageTransfer {
  private action: Action;
  private to: string;
  private from: string;
  private timestamp: Date;
  private data: any;

  constructor({ action, from, data }: Omit<MessageBody, "to" | "timestamp">) {
    this.action = action
    this.to = "dreams"
    this.from = from
    this.timestamp = new Date()
    this.data = data
  }

}