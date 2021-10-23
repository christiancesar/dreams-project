
import { User } from ".prisma/client";

export interface IUsersRepository {
  create(data: Omit<User, "id">): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId(userId: string): Promise<User | null>
  findAll(): Promise<User[]>
  updateUser(user: User): Promise<User>
  deleteUser(userId: string): Promise<User>
}