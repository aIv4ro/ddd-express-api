import { type Router } from 'express'
import { container } from '../dependency-injection'
import { type StatusGetController } from '../controllers/status-get-controller'

export const register = (router: Router): void => {
  const controller = container.get<StatusGetController>('statusGetController')
  router.get('/status', (req, res) => controller.run(req, res))
}
