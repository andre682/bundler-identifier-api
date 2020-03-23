import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining City model')
  const City = sequelize.define(
    'City',
    {
      // Model attributes
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // model options
    }
  )
  City.belongsTo( sequelize.models.Region)
  City.hasMany( sequelize.models.Destination)
  return City
}
