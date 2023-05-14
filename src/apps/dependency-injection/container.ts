import { createContainer, type AwilixContainer, InjectionMode, asClass, asValue } from 'awilix'
import { ConsoleLogger } from '../../contexts/shared/infrastructure/console-loger'
import { config } from '../../contexts/shared/infrastructure/config-loader'
import { Server } from '../server'
import { StatusGetController } from '../controllers/status/status-get-controller'
import { LoginController } from '../controllers/auth/login-controller'
import { RegisterController } from '../controllers/auth/register-controller'
import { createMongoClient } from '../../contexts/shared/infrastructure/persistance/mongodb/mongo-client'

export class Container {
  private readonly container: AwilixContainer

  constructor () {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    })
  }

  async register (): Promise<void> {
    const mongoClient = await createMongoClient(config)
    this.container
      .register({
        logger: asClass(ConsoleLogger).singleton(),
        config: asValue(config),
        server: asClass(Server).singleton(),
        mongoClient: asValue(mongoClient)
      }).register({
        statusGetController: asClass(StatusGetController).singleton(),
        registerController: asClass(RegisterController).singleton(),
        loginController: asClass(LoginController).singleton()
      })
  }

  get<T> (name: string): T {
    return this.container.resolve<T>(name)
  }
}
