import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining PointOfInterest model')
  const pointOfInterest = sequelize.define(
    'point_of_interest',
    {
      // Model attributes
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      // model options
    }
  )
  return pointOfInterest
}