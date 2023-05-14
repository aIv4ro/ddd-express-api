import { type MongoClient } from 'mongodb'

export abstract class MongoRepository {
  constructor (
    protected readonly mongoClient: MongoClient
  ) {}
}
