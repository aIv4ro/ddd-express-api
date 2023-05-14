export class User {
  readonly id: string
  readonly username: string
  readonly password: string

  constructor (id: string, username: string, password: string) {
    this.id = id
    this.username = username
    this.password = password
  }
}
