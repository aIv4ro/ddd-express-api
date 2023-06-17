import { type Request, type Response } from 'express'
import { type Controller } from '../controller'

export class ValidateTokenController implements Controller {
  async run (req: Request, res: Response): Promise<void> {
    res.json({ message: 'token validated!' })
  }
}
