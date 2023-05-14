import { type Router } from 'express'
import { type LoginController } from '../../controllers/auth/login-controller'
import { type RegisterController } from '../../controllers/auth/register-controller'
import { container } from '../../dependency-injection'

export const register = (router: Router): void => {
  const registerController = container.get<RegisterController>('registerController')
  const loginController = container.get<LoginController>('loginController')
  router.post('/auth/register', (req, res) => registerController.run(req, res))
  router.post('/auth/login', (req, res) => loginController.run(req, res))
}
