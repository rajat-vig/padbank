module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstname: DataTypes.STRING,
        middlename: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
        mobile: DataTypes.INTEGER,
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        village: DataTypes.STRING,
        streetline1: DataTypes.STRING,
        streetline2: DataTypes.STRING,
        pincode: DataTypes.INTEGER,
        dob: DataTypes.DATEONLY,
        gitype: DataTypes.STRING,
        idvalue: DataTypes.STRING
    },
    {
        freezeTableName: true
    }
);
    User.removeAttribute('id');

    User.associate = (models) => {
    User.belongsTo(models.Login, {foreignKey: 'userid', allowNull: false});
    }
    return User;
}