import { MongoRepository } from '../../shared/infrastructure/persistance/mongodb/mongo-repository'
import { type User } from '../domain/user'
import { type UserRepository } from '../domain/user-repository'

export class MongoUserRepository extends MongoRepository implements UserRepository {
  async save (user: User): Promise<void> {
    console.log(`save user ${user.username}`)
  }

  async searchAll (): Promise<User[]> {
    return []
  }
}
