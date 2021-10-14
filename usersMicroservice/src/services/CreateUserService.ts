import { User } from ".prisma/client";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

export class CreateUserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository()
  }
  
  async execute({ 
    first_name, 
    last_name, 
    birthday, 
    age, 
    email }: Omit<User, "id">): Promise<User> 
  {

    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if (userAlreadyExist) {
      return userAlreadyExist
    }

    const user = this.userRepository.create({ 
      first_name, 
      last_name, 
      birthday, 
      age, 
      email 
    })
    return user
  }
}