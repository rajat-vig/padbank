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
        Inventory.belongsTo(models.Login, {foreignKey: 'userid'});
        Inventory.belongsTo(models.Branch, {foreignKey: 'branchid'});
    }

    return Inventory;
}