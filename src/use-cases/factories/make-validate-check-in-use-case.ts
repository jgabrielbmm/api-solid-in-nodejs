import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  return new ValidateCheckInUseCase(checkInRepository)
}
