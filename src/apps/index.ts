import { container } from './dependency-injection'
import { type Server } from './server'

container
  .register()
  .then(() => {
    const server = container.get<Server>('server')
    server.start()
      .then(() => {})
      .catch(err => {
        console.error(err)
        process.exit(1)
      })
  })
  .catch(() => {
    console.error('Error building container')
  })
