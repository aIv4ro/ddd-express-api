import { type Router, type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { glob } from 'glob'
import httpStatus from 'http-status'

export function registerRoutes (router: Router): void {
  // eslint-disable-next-line n/no-path-concat
  const globPattern = __dirname.replace(/\\/gi, '/') + '/**/*.route.*'
  const routes = glob.sync(globPattern)
  routes.map(route => register(route, router))
}

async function register (routePath: string, router: Router): Promise<void> {
  const route = await import(routePath).catch(() => {
    console.error(`error resolving route on path ${routePath}`)
  })
  if (route == null || typeof route.register !== 'function') {
    console.warn(`route ${routePath} doesnt have a register exported function`)
    return
  }
  route.register(router)
}

export function validateReqSchema (req: Request, res: Response, next: NextFunction): void {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    next(); return
  }
  const errors = validationErrors.array().map((err: any) => ({ [err.path]: err.msg }))
  res.status(httpStatus.BAD_REQUEST).json({ errors })
}
