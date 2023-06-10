import { ObjectId, type Collection, type MongoClient } from 'mongodb'
import { type AggregateRoot } from '../../../domain/aggregate-root'

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor (
    protected readonly mongoClient: MongoClient
  ) {}

  protected abstract collectionName (): string
  protected get collection (): Collection { return this.mongoClient.db().collection(this.collectionName()) }

  protected async findById (id: string): Promise<T | null> {
    return await this.collection.findOne<T>({ _id: new ObjectId() })
  }

  protected async create (aggregate: Omit<T, 'id'>): Promise<string> {
    const { insertedId } = await this.collection.insertOne(aggregate)
    return insertedId.toString()
  }

  protected async update (id: any, aggregate: T): Promise<void> {
    await this.collection.updateOne({ _id: id }, { $set: aggregate })
  }
}
