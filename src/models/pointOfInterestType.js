import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining PointOfInterestType model')
  const PointOfInterestType = sequelize.define(
    'PointOfInterestType',
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
  return PointOfInterestType
}