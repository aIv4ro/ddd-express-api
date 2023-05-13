import { type Logger } from '../domain/logger'

export class ConsoleLogger implements Logger {
  debug (message: any): void {
    console.debug(message)
  }

  info (message: any): void {
    console.info(message)
  }

  error (message: any): void {
    console.error(message)
  }

  warning (message: any): void {
    console.warn(message)
  }
}
