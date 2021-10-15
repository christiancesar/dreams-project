import { Request, Response, Router } from "express";
import { MessageTransfer, Action } from "../class/MessageTransfer";

export interface User {
  first_name: string;
  last_name: string;
  age: number;
  birthday: string;
  email: string;
}

export class UsersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, age, birthday, email } = request.body

    const user = { first_name, last_name, age, birthday, email} as User

    const message = new MessageTransfer({
      action: Action.CREATE,
      data: user,
      from: "microservice-users"
    })

    await request.producer.send({
      topic: 'dreams-users',
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
    return response.json({ message: "Register send, please wait one moment and check your email!" });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const message = new MessageTransfer({
      action: Action.LIST,
      from: "microservice-users"
    })

    await request.producer.send({
      topic: 'dreams-users',
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
    return response.json({ message: "Users list will update!" })
  }
}