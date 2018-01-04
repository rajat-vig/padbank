module.exports = function (sequelize, DataTypes) {
    var Login = sequelize.define('Login', {
        userid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        activeuser: DataTypes.BOOLEAN       
    },
    {
        freezeTableName: true
    }
);
    Login.associate = (models) => {
        Login.hasOne(models.User, {foreignKey: 'userid', allowNull: false});
        Login.hasOne(models.Inventory, {foreignKey: 'userid', allowNull: false});
        Login.hasOne(models.Account, {foreignKey: 'userid', allowNull: false});
        Login.hasOne(models.Transactions, {foreignKey: 'userid', allowNull: false});
        Login.hasOne(models.Callback, {foreignKey: 'userid', allowNull: false});
    }
    return Login;
}