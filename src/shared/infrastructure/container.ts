import { createContainer, type AwilixContainer, InjectionMode, asClass, asValue } from 'awilix'
import { ConsoleLogger } from './console-loger'
import { config } from './config-loader'
import { Server } from './server'

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
  }

  get<T> (name: string): T {
    return this.container.resolve<T>(name)
  }
}
