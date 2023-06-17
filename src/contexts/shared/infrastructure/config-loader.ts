import * as dotenv from 'dotenv'
import { type Config } from '../domain/config'

const nodeEnv = process.env.NODE_ENV ?? 'dev'

dotenv.config({
  path: `environments/${nodeEnv}.env`
})

const { PORT, MONGO_URL, JWT_PRIVATE_KEY } = process.env

if (MONGO_URL == null) {
  console.error('bad env config: MONGO_URL is required')
  process.exit(1)
}

if (JWT_PRIVATE_KEY == null) {
  console.error('bad env config: JWT_PRIVATE_KEY is required')
  process.exit(1)
}

export const config: Config = {
  port: PORT ?? 8080,
  mongoUrl: MONGO_URL,
  jwtPrivateKey: JWT_PRIVATE_KEY
}
