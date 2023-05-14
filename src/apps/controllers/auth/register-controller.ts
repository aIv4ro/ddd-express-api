import { type Request, type Response } from 'express'
import { type Controller } from '../controller'

export class RegisterController implements Controller {
  async run (_req: Request, res: Response): Promise<void> {
    res.json({ message: 'Register not implemented' })
  }
}
