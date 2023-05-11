import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    })
  }
}
