import { type Request, type Response } from 'express'
import { type Controller } from '../controller'
import { type UserRepository } from '../../../contexts/user/domain/user-repository'

export class LoginController implements Controller {
  constructor (private readonly userRepository: UserRepository) {}
  async run (_req: Request, res: Response): Promise<void> {
    res.json({ message: 'Login not implemented' })
  }
}
