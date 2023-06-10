import { type Request, type Response } from 'express'
import { type Controller } from '../controller'
import { type UserRepository } from '../../../contexts/user/domain/user-repository'
import { ObjectId } from 'mongodb'
import { User } from '../../../contexts/user/domain/user'

export class RegisterController implements Controller {
  constructor (private readonly userRepository: UserRepository) {}

  async run (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body
    const id = new ObjectId()
    try {
      const user = new User(id, username, password)
      await this.userRepository.save(user)
      res.json({ message: 'User created', user })
    } catch (err) {
      res.status(500).json({ message: 'Error creating user', details: err.message })
    }
  }
}
