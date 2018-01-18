module.exports = function (sequelize, DataTypes) {
    var Callback = sequelize.define('Callback', {
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        mobile: DataTypes.INTEGER,
        email: DataTypes.STRING,
        mobile: DataTypes.BIGINT,
        address: DataTypes.STRING,
        unit: DataTypes.INTEGER,
        amount: DataTypes.DECIMAL,
        status: { type: DataTypes.STRING, defaultValue: "Open" }
    },
    {
        freezeTableName: true
    }
);
    Callback.removeAttribute('id');

    Callback.associate = (models) => {
    Callback.belongsTo(models.Login, {foreignKey: 'userid', allowNull: false});
    }
    return Callback;
}