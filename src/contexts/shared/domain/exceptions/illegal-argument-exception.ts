export class IllegalArgumentException extends Error {
  readonly name: string

  constructor (message: string) {
    super(message)
    this.name = 'IllegalArgumentException'
  }
}
