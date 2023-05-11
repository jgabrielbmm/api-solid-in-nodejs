import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/repositories/gyms-repository'
import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return prisma.gym.create({
      data,
    })
  }

  async findById(id: string) {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }

  async searchMany(query: string, page: number) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }
}
