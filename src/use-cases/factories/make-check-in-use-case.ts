import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  return new CheckInUseCase(checkInRepository, gymsRepository)
}
