import { type NextFunction, type Request, type Response } from 'express-serve-static-core'
import { type Middleware } from './middleware'
import { type TokenService } from '../../contexts/shared/domain/token-service'
import httpStatus from 'http-status'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly tokenService: TokenService
  ) {}

  async run (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers
    if (authorization == null) {
      res.status(httpStatus.FORBIDDEN).json({ message: 'Auth is required' })
      return
    }
    const userData = this.tokenService.decode(authorization)
    req.body.authUser = userData
    next()
  }
}
