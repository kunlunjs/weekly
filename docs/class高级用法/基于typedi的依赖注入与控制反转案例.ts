import 'reflect-metadata'
import type { Request, Response } from 'express'
import express from 'express'
import Container, { Service } from 'typedi'

// models/User.ts
interface User {
  name: string
}

// repositories/UserRepository.ts
@Service()
class UserRepository {
  private readonly users: User[] = [
    { name: '刘邦' },
    { name: '李世明' },
    { name: '朱元璋' }
  ]

  async getAllUsers() {
    return this.users
  }
}

// services/UserService.ts
@Service()
class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    const result = await this.userRepo.getAllUsers()
    return result
  }
}

// controllers/UserController.ts
@Service()
class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    const result = await this.userService.getAllUsers()
    return res.json(result)
  }
}

// main.ts
const main = async () => {
  const app = express()

  const userController = Container.get(UserController)

  app.get('/users', (req, res) => userController.getAllUsers(req, res))

  app.listen(3000, () => {
    console.log('Server started')
  })
}
main().catch(err => {
  console.error(err)
})
