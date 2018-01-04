module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define('Inventory', {
        inventoryid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        description: DataTypes.STRING,
        donationtype: DataTypes.STRING,
        unitdonated: DataTypes.INTEGER,
        amountdonated: DataTypes.DECIMAL

    },
    {
        freezeTableName: true
    }
);

    Inventory.associate = (models) => {
        Inventory.belongsTo(models.Login, {foreignKey: 'userid', allowNull: false});
        Inventory.belongsTo(models.Branch, {foreignKey: 'branchid', allowNull: false});
        Inventory.hasOne(models.Transactions, {foreignKey: 'userid', allowNull: false});
    }

    return Inventory;
}