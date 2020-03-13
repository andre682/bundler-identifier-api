import expressLoader from './express'
import bottle from './bottle'
import LoggerInstance from './logger'
import mongooseLoader from './mongoose'
import Bundle from '../models/bundle'
import BundlesService from '../services/bundles'

export default async ({ expressApp }) => {
  // loader logger
  bottle.factory('logger', () => LoggerInstance)
  const logger = bottle.container.logger
  const mongoConnection = await mongooseLoader()
  logger.info('DB loaded and connected!')

  //load express
  await expressLoader({ app: expressApp })
  logger.info('Express loaded')
  
  // Load models
  bottle.factory('bundlesModel', () => Bundle)

  // Load services
  bottle.factory('bundlesService', container => new BundlesService(container))

}
