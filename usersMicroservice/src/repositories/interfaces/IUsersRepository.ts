
import { Prisma, User } from ".prisma/client";
import { ICreateUser } from "../../dtos/ICreateUser";

export interface IUsersRepository {
  create(data: Omit<User, "id">): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
}