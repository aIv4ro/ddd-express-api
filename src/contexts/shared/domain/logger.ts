type LogFn = (message: any) => void

export interface Logger {
  debug: LogFn
  info: LogFn
  error: LogFn
  warning: LogFn
}
