import { type Logger } from './shared/domain/logger'
import { Container } from './shared/infrastructure/container'
import { type Server } from './shared/infrastructure/server'

const container = new Container()
const server = container.get<Server>('server')
const logger = container.get<Logger>('logger')

server.start()
  .then(() => {})
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })
