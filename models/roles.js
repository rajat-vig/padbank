module.exports = function (sequelize, DataTypes) {
    var Roles = sequelize.define('Roles', {
        roleid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        roletype: DataTypes.STRING
    },
    {
        freezeTableName: true
    }
);

Roles.associate = (models) => {
    Roles.belongsTo(models.Permissions, {foreignKey: 'permissionid', allowNull: false});
    Roles.hasOne(models.Account, {foreignKey: 'roleid', allowNull: false});
    }
    return Roles;
}