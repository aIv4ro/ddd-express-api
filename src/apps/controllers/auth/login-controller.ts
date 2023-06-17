import { type Request, type Response } from 'express'
import { type Controller } from '../controller'
import { type UserRepository } from '../../../contexts/user/domain/user-repository'
import httpStatus from 'http-status'
import { type TokenService } from '../../../contexts/shared/domain/token-service'

export class LoginController implements Controller {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async run (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body
    const user = await this.userRepository.findByUsername(username)
    if (user == null || user.password !== password) {
      res.status(httpStatus.FORBIDDEN).json({ message: 'bad credentials' })
      return
    }
    const userPrimitives = { ...user.toPrimitives(), password: undefined }
    const token = this.tokenService.encode(userPrimitives)
    res.json({ token, user: userPrimitives })
  }
}
