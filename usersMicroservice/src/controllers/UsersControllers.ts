import { Action, MessageTransfer } from "../../class/MessageTransfer";
import { usersProducer } from "../provider/kafka/usersProducer";

export class UsersControllers {
  async index() {
    const users = [
      {
        name: 'Christian Cesar',
        age: 23,
        birthday: '1997-11-01',
        email: 'christian.cesar@gmail.com'
      },
      {
        name: 'Maria Clara',
        age: 25,
        birthday: '1995-05-25',
        email: 'maria.clara@gmail.com'
      }
    ]

    const message = new MessageTransfer({
      action: Action.LISTED,
      from: "dreams",
      data: users
    })

    usersProducer.send({
      topic: 'users-dreams',
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
  }
}