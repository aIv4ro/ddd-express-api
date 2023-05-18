import { AggregateRoot } from '../../shared/domain/aggregate-root'

export class User extends AggregateRoot {
  readonly id: string
  readonly username: string
  readonly password: string

  constructor (id: string, username: string, password: string) {
    super()
    this.id = id
    this.username = username
    this.password = password
  }

  toPrimitives (): Record<string, any> {
    return { id: this.id, username: this.username, password: this.password }
  }
}
