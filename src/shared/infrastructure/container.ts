import { createContainer, type AwilixContainer, InjectionMode, asClass } from 'awilix'
import { ConsoleLogger } from './console-loger'

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
        logger: asClass(ConsoleLogger).singleton()
      })
  }

  get<T> (name: string): T {
    return this.container.resolve<T>(name)
  }
}
