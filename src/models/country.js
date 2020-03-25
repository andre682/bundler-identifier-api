import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Country model')
  const country = sequelize.define(
    'country',
    {
      // Model attributes
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // model options
    }
  )
  return country
}
