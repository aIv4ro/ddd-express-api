import { type Request, type Response } from 'express'
import { type Controller } from '../controller'
import { type UserRepository } from '../../../contexts/user/domain/user-repository'
import { ObjectId } from 'mongodb'
import { User } from '../../../contexts/user/domain/user'
import httpStatus from 'http-status'
import { IllegalArgumentException } from '../../../contexts/shared/domain/exceptions/illegal-argument-exception'
import { UniqueKeyException } from '../../../contexts/shared/domain/exceptions/unique-key-exception'

export class RegisterController implements Controller {
  constructor (private readonly userRepository: UserRepository) {}

  async run (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body
    const id = new ObjectId()
    try {
      const user = new User(id, username, password)
      await this.userRepository.save(user)
      res.json({ message: 'user created', user })
    } catch (err) {
      if (err instanceof UniqueKeyException) {
        res.status(httpStatus.BAD_REQUEST).json({ message: err.message })
        return
      }
      if (err instanceof IllegalArgumentException) {
        res.status(httpStatus.BAD_REQUEST).json({ message: err.message })
        return
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user' })
    }
  }
}
