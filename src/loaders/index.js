import expressLoader from './express'
import bottle from './bottle'
import LoggerInstance from './logger'
import sequelizeLoader from './sequelize'
// Importing Models & Services
import Country from '../models/country'
import Region from '../models/region'
import City from '../models/city'
import Destination from '../models/destination'
import Pathway from '../models/pathway'
import Trip from '../models/trip'
import Article from '../models/article'
import Image from '../models/image'
import PointOfInterest from '../models/pointOfInterest'
import PointOfInterestType from '../models/pointOfInterestType'
import dbRelations from '../models/dbRelations' // Relational information

import PostService from '../services/posts'

export default async ({ expressApp }) => {
  // loader logger
  bottle.factory('logger', () => LoggerInstance)
  const logger = bottle.container.logger
  //load database(
  const sequelizeInstance = await sequelizeLoader()
  bottle.factory('sequelize', () => sequelizeInstance)

  // Load models
  bottle.service('Country', Country(bottle.container.sequelize))
  bottle.service('Region', Region(bottle.container.sequelize))
  bottle.service('City', City(bottle.container.sequelize))
  bottle.service('Destination', Destination(bottle.container.sequelize))
  bottle.service('Pathway', Pathway(bottle.container.sequelize))
  bottle.service('Trip', Trip(bottle.container.sequelize))
  bottle.service('Article', Article(bottle.container.sequelize))
  bottle.service('Image', Image(bottle.container.sequelize))
  bottle.service('PointOfInterest', PointOfInterest(bottle.container.sequelize))
  bottle.service('PointOfInterestType', PointOfInterestType(bottle.container.sequelize))
  dbRelations(bottle.container.sequelize)

  // bottle.service('Post', Post(bottle.container.sequelize))

  await sequelizeInstance.sync({ force: true })

  // Load services
  bottle.factory('postService', container => new PostService(container))

  //load express
  await expressLoader({ app: expressApp })
  logger.info('Express loaded')
}
