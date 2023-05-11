import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  return new GetUserMetricsUseCase(checkInRepository)
}
