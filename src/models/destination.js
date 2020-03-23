import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Destination model')
  const Destination = sequelize.define(
    'Destination',
    {
      // Model attributes
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      // model options
    }
  )
  //Destination.belongsTo(sequelize.models.City)
  return Destination
}