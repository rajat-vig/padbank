module.exports = function (sequelize, DataTypes) {
    var Branch = sequelize.define('Branch', {
        branchid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        address: DataTypes.STRING,
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
    Branch.associate = (models) => {
        Branch.hasOne(models.Inventory, {foreignKey: 'branchid', allowNull: false});
        Branch.hasOne(models.Account, {foreignKey: 'branchid', allowNull: false});
        Branch.hasOne(models.Transactions, {foreignKey: 'branchid', allowNull: false});
    }
    return Branch;
}