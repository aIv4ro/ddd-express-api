import { type Logger } from '../contexts/shared/domain/logger'
import { Container } from './container'
import { type Server } from './server'

const container = new Container()
const server = container.get<Server>('server')
const logger = container.get<Logger>('logger')

server.start()
  .then(() => {})
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })
