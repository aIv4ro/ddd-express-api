import { type ConsoleLogger } from './shared/infrastructure/console-loger'
import { Container } from './shared/infrastructure/container'
import { config } from './shared/infrastructure/config-loader'

const container = new Container()
const logger = container.get<ConsoleLogger>('logger')
logger.info(config)
