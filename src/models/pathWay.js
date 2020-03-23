import { DataTypes } from 'sequelize'
import bottle from '../loaders/bottle'

export default sequelize => {
  const logger = bottle.container.logger
  logger.debug('defining Pathway model')
  const Pathway = sequelize.define(
    'Pathway',
    {
      // Model attributes
      vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wayPoints: {
        type: DataTypes.ARRAY,
        allowNull: true,
      }
    },
    {
      // model options
    }
  )
  //Pathway.belongsTo(sequelize.models.City)
  return Pathway
}