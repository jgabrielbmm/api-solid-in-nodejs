import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password_hash = await hash('123456', 6)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash,
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password_hash = await hash('123456', 6)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash,
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
