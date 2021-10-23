import { Action, MessageTransfer, Status } from "../../@types/MessageTransfer";
import { ICreateUser } from "../dtos/ICreateUserDTO";
import { usersProducer } from "../provider/kafka/usersProducer";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { ShowUserService } from "../services/ShowUserService";

interface IShowUser {
  userId: string
}
export class UsersControllers {
  private listUsersService: ListUsersService
  private createUserService: CreateUserService
  private showUserService: ShowUserService
  // private deleteUserService: DeleteUserService
  // private updateUserService: UpdateUserService

  constructor() {
    this.listUsersService = new ListUsersService()
    this.createUserService = new CreateUserService()
    this.showUserService = new ShowUserService()
    // this.deleteUserService = new DeleteUserService()
    // this.updateUserService = new UpdateUserService()
  }

  async create({ first_name, last_name, birthday, age, email }: ICreateUser): Promise<void> {
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

  async index(): Promise<void> {
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

  async show({ userId }: IShowUser): Promise<void> {
    const user = await this.showUserService.execute({ userId })
    console.log(user)
  }
}