import { createContainer, type AwilixContainer, InjectionMode, asClass, asValue } from 'awilix'
import { ConsoleLogger } from '../../contexts/shared/infrastructure/console-loger'
import { config } from '../../contexts/shared/infrastructure/config-loader'
import { Server } from '../server'
import { StatusGetController } from '../controllers/status-get-controller'

export class Container {
  private readonly container: AwilixContainer

  constructor () {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    })
    this.register()
  }

  register (): void {
    this.container
      .register({
        logger: asClass(ConsoleLogger).singleton(),
        config: asValue(config),
        server: asClass(Server).singleton()
      })
      .register({
        statusGetController: asClass(StatusGetController).singleton()
      })
  }

  get<T> (name: string): T {
    return this.container.resolve<T>(name)
  }
}
