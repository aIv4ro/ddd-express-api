import { type Request, type Response } from 'express'
import { type Controller } from './controller'
import httpStatus from 'http-status'

export class StatusGetController implements Controller {
  async run (_req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).send()
  }
}
