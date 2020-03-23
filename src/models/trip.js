import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Trip model')
  const Trip = sequelize.define(
    'Trip',
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
  return Trip
}