import { type Logger } from '../contexts/shared/domain/logger'
import { container } from './dependency-injection'
import { type Server } from './server'

const server = container.get<Server>('server')
const logger = container.get<Logger>('logger')

server.start()
  .then(() => {})
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })
