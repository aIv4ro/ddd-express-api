import express, { Router, type Express } from 'express'
import type * as http from 'http'
import { type AddressInfo } from 'net'
import { type Logger } from '../contexts/shared/domain/logger'
import { type Config } from '../contexts/shared/domain/config'
import { registerRoutes } from './routes'

export class Server {
  express: Express
  http!: http.Server

  constructor (
    private readonly config: Config,
    private readonly logger: Logger
  ) {
    this.express = express()
    const router = Router()
    this.express.use(router)
    router.use(express.json())
    registerRoutes(router)
  }

  async start (): Promise<void> {
    await new Promise<void>((resolve) => {
      this.http = this.express.listen(this.config.port, () => {
        const { port } = this.http.address() as AddressInfo
        this.logger.info(`🚀 Application running on http://localhost:${port}`)
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.logger.info('Stopping http server...')
      this.http.close((err) => {
        if (err != null) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }
}
