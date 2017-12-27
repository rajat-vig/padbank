module.exports = function (sequelize, DataTypes) {
    var Branch = sequelize.define('Branch', {
        branchid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        state: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        pincode: DataTypes.INTEGER,
        subbranchid: DataTypes.INTEGER
    },
    {
        freezeTableName: true
    }
);
    return Branch;
}