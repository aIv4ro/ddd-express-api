import { type Config } from '../../../domain/config'

export const createMongoClient = async (config: Config): Promise<any> => {
  return await new Promise<any>((resolve) => {
    setTimeout(() => { resolve({ mongodb: true }) }, 1000)
  })
}
