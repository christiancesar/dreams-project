import { Action, MessageTransfer, Status } from "../../class/MessageTransfer";
import { ICreateUser } from "../dtos/ICreateUser";
import { usersProducer } from "../provider/kafka/usersProducer";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";


export class UsersControllers {
  private listUsersService: ListUsersService
  private createUserService: CreateUserService
  // private showUserService: ShowUserService
  // private deleteUserService: DeleteUserService
  // private updateUserService: UpdateUserService

  constructor() {
    this.listUsersService = new ListUsersService()
    this.createUserService = new CreateUserService()

  }

  async create({ first_name, last_name, birthday, age, email }: ICreateUser) {
    try {
      const user = await this.createUserService.execute({
        first_name,
        last_name,
        birthday,
        age,
        email
      })

      const userFormatted = JSON.stringify(user);

      usersProducer.send({
        topic: 'users-dreams',
        messages: [
          { value: userFormatted }
        ]
      })

    } catch (error) {
      const message = new MessageTransfer({
        action: Action.CREATE,
        from: "dreams",
        status: Status.ERROR
      })

      usersProducer.send({
        topic: 'users-dreams',
        messages: [
          { value: JSON.stringify(message) }
        ]
      })
    }

  }

  async index() {
    try {
      const users = await this.listUsersService.execute()

      const message = new MessageTransfer({
        action: Action.LIST,
        from: "dreams",
        data: users,
        status: Status.SUCCESS
      })

      usersProducer.send({
        topic: 'users-dreams',
        messages: [
          { value: JSON.stringify(message) }
        ]
      })
    } catch (error: any) {
      const message = new MessageTransfer({
        action: Action.LIST,
        from: "dreams",
        status: Status.ERROR,
        errorDescribe: error.message
      })

      usersProducer.send({
        topic: 'users-dreams',
        messages: [
          { value: JSON.stringify(message) }
        ]
      })
    }
  }
}