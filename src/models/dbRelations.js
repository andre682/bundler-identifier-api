export default sequelize => {
  /**
   * country
   * region
   * city
   * destination
   * pathway
   * trip
   * article
   * image
   * point_of_interest
   * point_of_interest_type
   */

  sequelize.models.country.hasMany(sequelize.models.region)
  sequelize.models.region.hasMany(sequelize.models.city)
  sequelize.models.city.hasMany(sequelize.models.destination)

  sequelize.models.destination.belongsTo(sequelize.models.trip)
  sequelize.models.destination.hasMany(sequelize.models.point_of_interest)
  sequelize.models.point_of_interest.hasOne(sequelize.models.point_of_interest_type)

  sequelize.models.article.belongsToMany(sequelize.models.destination, { through: 'mentions' })
  sequelize.models.article.belongsToMany(sequelize.models.destination, { through: 'mentions' })
  sequelize.models.article.hasMany(sequelize.models.image)

  sequelize.models.pathway.belongsTo(sequelize.models.destination, { as: 'from' })
  sequelize.models.pathway.belongsTo(sequelize.models.destination, { as: 'to' })
}
