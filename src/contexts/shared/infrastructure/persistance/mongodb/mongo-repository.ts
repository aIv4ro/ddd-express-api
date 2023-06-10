import { type ObjectId, type Collection, type MongoClient } from 'mongodb'
import { type AggregateRoot } from '../../../domain/aggregate-root'
import { type Nullable } from '../../../domain/nullable'

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor (
    protected readonly mongoClient: MongoClient
  ) {}

  protected abstract collectionName (): string
  protected get collection (): Collection { return this.mongoClient.db().collection(this.collectionName()) }
  protected abstract findById (id: ObjectId): Promise<Nullable<T>>

  protected async create (aggregate: T): Promise<Nullable<ObjectId>> {
    const { insertedId } = await this.collection.insertOne(aggregate.toPrimitives())
    return insertedId
  }

  protected async update (id: ObjectId, aggregate: T): Promise<void> {
    await this.collection.updateOne({ _id: id }, { $set: aggregate })
  }
}
