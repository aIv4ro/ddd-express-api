import { type Request, type Response } from 'express'
import { type Controller } from '../controller'
import { type UserRepository } from '../../../contexts/user/domain/user-repository'
import httpStatus from 'http-status'

export class LoginController implements Controller {
  constructor (private readonly userRepository: UserRepository) {}
  async run (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body
    const user = await this.userRepository.findByUsername(username)
    if (user == null || user.password !== password) {
      res.status(httpStatus.FORBIDDEN).json({ message: 'bad credentials' })
      return
    }
    res.json({ token: 'my_awesome_token', user: { ...user, password: undefined } })
  }
}
