import { usersProducer } from "../provider/kafka/usersProducer";

export class UsersControllers {
  async index() {
    const users = [
      {
        name: 'Christian Cesar',
        age: 23,
        birthday: '1997-11-01'
      },
      {
        name: 'Maria Clara',
        age: 25,
        birthday: '1995-05-25'
      }
    ]

    const usersFormatted = JSON.stringify(users);

    usersProducer.send({
      topic: 'users-dreams',
      messages: [
        { value: usersFormatted }
      ]
    })
  }
}