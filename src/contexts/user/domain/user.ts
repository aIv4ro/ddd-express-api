import { ObjectId } from 'mongodb'
import { AggregateRoot } from '../../shared/domain/aggregate-root'
import { IllegalArgumentException } from '../../shared/domain/exceptions/illegal-argument-exception'

export class User extends AggregateRoot {
  readonly id: ObjectId
  readonly username: string
  readonly password: string

  constructor (id: string | ObjectId, username: string, password: string) {
    super()
    User.validateUsername(username)
    User.validatePassword(password)
    if (!ObjectId.isValid(id)) throw new IllegalArgumentException('identifier is not valid')
    this.id = typeof id === 'string' ? new ObjectId(id) : id
    this.username = username
    this.password = password
  }

  static validateUsername (username: string): void {
    if (username == null || username.trim() === '') {
      throw new IllegalArgumentException('username can\'t be empty')
    }
  }

  static validatePassword (password: string): void {
    if (password == null || password.trim() === '') {
      throw new IllegalArgumentException('password can\'t be empty')
    }
    if (password.length < 8) {
      throw new IllegalArgumentException('password length must be greater than 7')
    }
  }

  toPrimitives (): Record<string, any> {
    return { id: this.id.toString(), username: this.username, password: this.password }
  }
}
