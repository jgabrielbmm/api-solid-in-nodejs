import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

describe('Register Use Case', async () => {
  it('should hash user password upon registration', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register user with same email twice', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(user.id).toEqual(expect.any(String))
  })
})
