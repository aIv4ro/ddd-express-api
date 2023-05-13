import * as dotenv from 'dotenv'
import { type Config } from '../domain/config'

const nodeEnv = process.env.NODE_ENV ?? 'dev'

dotenv.config({
  path: `environments/${nodeEnv}.env`
})

export const config: Config = {
  port: process.env.PORT ?? 8080
}
