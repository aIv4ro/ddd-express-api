import { type Request, type Response } from 'express'
import { type Controller } from '../controller'
import { type UserRepository } from '../../../contexts/user/domain/user-repository'

export class RegisterController implements Controller {
  constructor (private readonly userRepository: UserRepository) {}

  async run (_req: Request, res: Response): Promise<void> {
    const users = await this.userRepository.searchAll()
    res.json({ message: 'Register not implemented', users })
  }
}
