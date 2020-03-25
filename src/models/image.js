import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Image model')
  const image = sequelize.define(
    'image',
    {
      // Model attributes
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      // model options
    }
  )
  return image
}