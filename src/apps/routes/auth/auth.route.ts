import { type Router } from 'express'
import { type LoginController } from '../../controllers/auth/login-controller'
import { type RegisterController } from '../../controllers/auth/register-controller'
import { container } from '../../dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '..'
import { ValidateTokenController } from '../../controllers/auth/validate-token-controller'
import { type AuthMiddleware } from '../../middlewares/auth-middleware'

export const register = (router: Router): void => {
  const registerSchema = [
    body('username').exists().isString().notEmpty({ ignore_whitespace: true }),
    body('password').exists().isString().isLength({ min: 8 })
  ]
  const registerController = container.get<RegisterController>('registerController')
  router.post('/auth/register', registerSchema, validateReqSchema, registerController.run.bind(registerController))

  const loginSchema = [
    body('username').exists().isString(),
    body('password').exists().isString().isLength({ min: 8 })
  ]
  const loginController = container.get<LoginController>('loginController')
  router.post('/auth/login', loginSchema, validateReqSchema, loginController.run.bind(loginController))

  const authMiddleware = container.get<AuthMiddleware>('authMiddleware')
  const validateTokenController = container.get<ValidateTokenController>('validateTokenController')
  router.post('/auth/validate_token', authMiddleware.run.bind(authMiddleware), validateTokenController.run.bind(ValidateTokenController))
}
