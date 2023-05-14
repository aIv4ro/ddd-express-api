import { type Router } from 'express'
import { glob } from 'glob'

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
