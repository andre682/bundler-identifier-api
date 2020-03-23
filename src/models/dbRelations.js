
export default sequelize => {
    
    sequelize.models.Region.belongsTo(sequelize.models.Country)

}
