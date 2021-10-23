import { Action, MessageBody } from "../../@types/MessageTransfer";
import { UsersControllers } from "../controllers/UsersControllers";

interface CreateUser {
  first_name: string;
  last_name: string;
  age: number;
  birthday: string;
  email: string;
}

const usersControllers = new UsersControllers()

export async function executeActions(currier: MessageBody) {
  switch (currier.action) {
    case Action.CREATE:
      const { age, birthday, email, first_name, last_name } = currier.data as CreateUser

      await usersControllers.create({ 
        age, 
        birthday, 
        email, 
        first_name, 
        last_name 
      })
      
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