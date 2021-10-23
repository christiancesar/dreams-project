import { User } from ".prisma/client";
import { prisma } from "../../provider/prisma";
import { IUsersRepository } from "../interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create(data: Omit<User, "id">): Promise<User> {
    const user = await prisma.user.create({
      data
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    return user
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }

  async updateUser(user: User): Promise<User> {
    const userUpdate = await prisma.user.update({ 
      where: { 
        id: user.id 
      }, 
      data: user 
    })
    return userUpdate
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id: userId } })
    return user
  }
}