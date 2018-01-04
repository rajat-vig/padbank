module.exports = function (sequelize, DataTypes) {
    var Permissions = sequelize.define('Permissions', {
        permissionid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        permissiondescription: DataTypes.STRING
        },
    {
        freezeTableName: true
    }
);
    Permissions.associate = (models) => {
        Permissions.hasOne(models.Roles, {foreignKey: 'permissionid', allowNull: false});
    }
    return Permissions;
}