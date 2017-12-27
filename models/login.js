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
    return Login;
}