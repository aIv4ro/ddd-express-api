import { type Router } from 'express'

export const register = (router: Router): void => {
  router.get('/status', (req, res) => res.json({ status: 'OK' }))
}
