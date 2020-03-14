import expressLoader from './express'
import bottle from './bottle'
import LoggerInstance from './logger'
import Bundle from '../models/bundle'
import BundlesService from '../services/bundles'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
  const uri = await mongod.getConnectionString()

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  }

  const connection = await mongoose.connect(uri, mongooseOpts)
  return connection.connection.db
}
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}
const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

export default async ({ expressApp }) => {
  // loader logger
  bottle.factory('logger', () => LoggerInstance)
  const logger = bottle.container.logger
  const mongoConnection = await connect()
  logger.info('DB loaded and connected!')

  //load express
  await expressLoader({ app: expressApp })
  logger.info('Express loaded')

  // Load models
  bottle.factory('bundlesModel', () => Bundle)

  // Load services
  bottle.factory('bundlesService', container => new BundlesService(container))
}
