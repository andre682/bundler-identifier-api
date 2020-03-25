import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Pathway model')
  const pathway = sequelize.define(
    'pathway',
    {
      // Model attributes
      vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wayPoints: {
        type: DataTypes.STRING, //Should be an array
        allowNull: true,
      }
    },
    {
      // model options
    }
  )
  return pathway
}