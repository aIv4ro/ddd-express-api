import { type Router } from 'express'
import { glob } from 'glob'

export function registerRoutes (router: Router): void {
  // eslint-disable-next-line n/no-path-concat
  const globPattern = __dirname.replace(/\\/gi, '/') + '/**/*.route.*'
  const routes = glob.sync(globPattern)
  routes.map(async route => { await register(route, router).then() })
}

async function register (routePath: string, router: Router): Promise<void> {
  const route = await import(routePath).catch(() => {
    console.error(`error resolving route on path ${routePath}`)
  })
  console.log(route)
  if (route == null || typeof route.register !== 'function') {
    return
  }
  route.register(router)
}