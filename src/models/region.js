import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Region model')
  const Region = sequelize.define(
    'Region',
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
  return Region
}
