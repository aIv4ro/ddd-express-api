import { type Request, type Response, type Router } from 'express'
import { type LoginController } from '../../controllers/auth/login-controller'
import { type RegisterController } from '../../controllers/auth/register-controller'
import { container } from '../../dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '..'

export const register = (router: Router): void => {
  const registerSchema = [
    body('username').exists().isString(),
    body('password').exists().isString()
  ]

  const registerController = container.get<RegisterController>('registerController')
  const loginController = container.get<LoginController>('loginController')
  router.post('/auth/register', registerSchema, validateReqSchema, (req: Request, res: Response) => registerController.run(req, res))
  router.post('/auth/login', (req, res) => loginController.run(req, res))
}
