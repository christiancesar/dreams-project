import { User } from ".prisma/client";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IRequest {
  userId: string
}

export class ShowUserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository()
  }

  async execute({ userId }: IRequest): Promise<User> {
    const user = await this.userRepository.findByUserId(userId)
    
    if (!user) {
      throw new Error("Sorry, but user not exist.");
    }
    
    return user
  }
}