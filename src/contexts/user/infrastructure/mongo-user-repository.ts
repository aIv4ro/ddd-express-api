import { MongoRepository } from '../../shared/infrastructure/persistance/mongodb/mongo-repository'
import { type User } from '../domain/user'
import { type UserRepository } from '../domain/user-repository'

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  protected collectionName (): string {
    return 'users'
  }

  async save (user: Omit<User, 'id'>): Promise<void> {
    await this.create(user)
  }

  async searchAll (): Promise<User[]> {
    return await this.collection.find<User>({}).toArray()
  }
}
