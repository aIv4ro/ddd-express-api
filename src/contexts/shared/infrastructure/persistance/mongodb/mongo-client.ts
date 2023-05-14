import { MongoClient } from 'mongodb'
import { type Config } from '../../../domain/config'

export const createMongoClient = async (config: Config): Promise<MongoClient> => {
  const client = new MongoClient(config.mongoUrl, { connectTimeoutMS: 1000, socketTimeoutMS: 1000 })
  return await client.connect()
}
