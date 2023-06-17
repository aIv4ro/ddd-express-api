import { type NextFunction, type Request, type Response } from 'express'

export interface Middleware {
  run: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
