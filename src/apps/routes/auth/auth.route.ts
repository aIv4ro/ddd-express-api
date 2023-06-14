import { type Router } from 'express'
import { type LoginController } from '../../controllers/auth/login-controller'
import { type RegisterController } from '../../controllers/auth/register-controller'
import { container } from '../../dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '..'

export const register = (router: Router): void => {
  const registerSchema = [
    body('username').exists().isString().notEmpty({ ignore_whitespace: true }),
    body('password').exists().isString().isLength({ min: 8 })
  ]
  const loginSchema = [
    body('username').exists().isString(),
    body('password').exists().isString().isLength({ min: 8 })
  ]

  const registerController = container.get<RegisterController>('registerController')
  const loginController = container.get<LoginController>('loginController')
  router.post('/auth/register', registerSchema, validateReqSchema, registerController.run.bind(registerController))
  router.post('/auth/login', loginSchema, validateReqSchema, loginController.run.bind(loginController))
}
