import { Action, MessageBody } from "../../class/MessageTransfer";
import { UsersControllers } from "../controllers/UsersControllers";

const usersControllers = new UsersControllers()

export async function executeActions(currier: MessageBody) {
  switch (currier.action) {
    case Action.CREATE:
      
      break;
    case Action.LIST:
      await usersControllers.index()
      break;
    case Action.FIND:
    
      break;  
    default:
      break;
  }
}