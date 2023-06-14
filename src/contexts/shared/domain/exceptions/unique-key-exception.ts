export class UniqueKeyException extends Error {
  readonly name: string = 'UniqueKeyException'
  readonly field?: string

  constructor (
    message: string,
    field?: string
  ) {
    super(message)
    this.field = field
  }
}
