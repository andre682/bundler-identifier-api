import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Article model')
  const article = sequelize.define(
    'article',
    {
      // Model attributes
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      // model options
    }
  )
  return article
}