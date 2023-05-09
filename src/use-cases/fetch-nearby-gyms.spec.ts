import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase
describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'gym-description',
      phone: '9999999999',
      latitude: -5.0650491,
      longitude: -42.7670112,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'gym-description',
      phone: '9999999999',
      latitude: -5.1924547,
      longitude: -42.7601638,
    })

    const { gyms } = await sut.execute({
      userLatitude: -5.0650491,
      userLongitude: -42.7670112,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
