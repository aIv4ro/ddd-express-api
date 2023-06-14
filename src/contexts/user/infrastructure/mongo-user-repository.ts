import { type ObjectId } from 'mongodb'
import { type Nullable } from '../../shared/domain/nullable'
import { MongoRepository } from '../../shared/infrastructure/persistance/mongodb/mongo-repository'
import { User } from '../domain/user'
import { type UserRepository } from '../domain/user-repository'
import { UniqueKeyException } from '../../shared/domain/exceptions/unique-key-exception'

interface UserCollection {
  _id: ObjectId
  username: string
  password: string
}

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  protected collectionName (): string { return 'users' }

  public async findById (id: ObjectId): Promise<Nullable<User>> {
    const document = await this.collection.findOne<UserCollection>({ _id: id })
    return document != null ? new User(document._id, document.username, document.password) : null
  }

  public async findByUsername (username: string): Promise<Nullable<User>> {
    const document = await this.collection.findOne<UserCollection>({ username })
    return document != null ? new User(document._id, document.username, document.password) : null
  }

  async save (user: User): Promise<void> {
    const isUsernameInUse = await this.findByUsername(user.username).then(res => res != null)
    if (isUsernameInUse) {
      throw new UniqueKeyException(`Username ${user.username} is already in use`, 'username')
    }
    await this.create(user.id, user)
      .catch(err => { throw err })
  }
}
